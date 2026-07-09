import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "./ui/select";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { listarCategorias, type CategoriaDTO } from "../../services/categorias";
import { crearProducto, actualizarProducto, type ProductoDTO } from "../../services/productos";
import { subirImagen } from "../../services/upload";

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  product?: ProductoDTO | null;
}

export default function ProductModal({ open, onOpenChange, onSuccess, product }: ProductModalProps) {
  const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);
  const [categoriaId, setCategoriaId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [stock, setStock] = useState("0");
  const [disponible, setDisponible] = useState(true);
  const [destacado, setDestacado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [catsLoaded, setCatsLoaded] = useState(false);
  const [prefilled, setPrefilled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditing = !!product;

  useEffect(() => {
    if (!open) return;
    if (!catsLoaded) {
      listarCategorias().then(setCategorias).catch(() => setErrors((e) => ({ ...e, _general: "Error al cargar categorías" }))).finally(() => setCatsLoaded(true));
    }
    if (product && !prefilled) {
      setCategoriaId(String(product.categoriaId));
      setNombre(product.nombre);
      setDescripcion(product.descripcion || "");
      setPrecio(String(product.precio));
      setImagenUrl(product.imagenUrl || "");
      setStock(String(product.stock));
      setDisponible(product.disponible);
      setDestacado(product.destacado);
      setPrefilled(true);
    } else if (!product) {
      setCategoriaId(""); setNombre(""); setDescripcion(""); setPrecio(""); setImagenUrl(""); setStock("0"); setDisponible(true); setDestacado(false); setPrefilled(false);
    }
    setErrors({});
    setUploadProgress(0);
  }, [open, product]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => setUploadProgress((p) => Math.min(p + 10, 90)), 300);
    try {
      const result = await subirImagen(file);
      clearInterval(interval);
      setUploadProgress(100);
      setImagenUrl(result.url);
      setTimeout(() => setUploadProgress(0), 1000);
    } catch (err) {
      clearInterval(interval);
      setUploadProgress(0);
      setErrors((e) => ({ ...e, _general: err instanceof Error ? err.message : "Error al subir imagen" }));
    } finally {
      setUploading(false);
    }
  };

  const validar = (): boolean => {
    const errs: Record<string, string> = {};
    if (!categoriaId) errs.categoriaId = "Selecciona una categoría";
    if (!nombre.trim()) errs.nombre = "El nombre es obligatorio";
    const p = parseFloat(precio);
    if (!precio || isNaN(p) || p < 0) errs.precio = "Ingresa un precio válido";
    const s = parseInt(stock, 10);
    if (isNaN(s) || s < 0) errs.stock = "El stock no puede ser negativo";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validar()) return;
    setLoading(true);
    try {
      const dto = {
        categoriaId: parseInt(categoriaId, 10), nombre: nombre.trim(),
        descripcion: descripcion.trim() || undefined, precio: parseFloat(precio),
        imagenUrl: imagenUrl.trim() || undefined, stock: parseInt(stock, 10),
        disponible, destacado,
      };
      if (isEditing && product?.id) await actualizarProducto(product.id, dto);
      else await crearProducto(dto);
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      setErrors({ _general: `Error al ${isEditing ? "actualizar" : "guardar"} el producto. ${err instanceof Error ? err.message : "Intenta de nuevo."}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[24px] font-bold text-[#191c1d]">{isEditing ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-2">
          {errors._general && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#ffdad6] text-[#ba1a1a] px-4 py-3 rounded-xl text-sm font-medium">
              {errors._general}
            </motion.div>
          )}

          <div className="space-y-2">
            <Label className="text-[#191c1d] font-medium">Categoría <span className="text-[#ba1a1a]">*</span></Label>
            <Select value={categoriaId} onValueChange={setCategoriaId}>
              <SelectTrigger className="w-full bg-[#f3f4f5] border-none rounded-xl">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>{cat.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoriaId && <p className="text-[#ba1a1a] text-xs mt-1">{errors.categoriaId}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-[#191c1d] font-medium">Nombre del producto <span className="text-[#ba1a1a]">*</span></Label>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)} className="bg-[#f3f4f5] border-none rounded-xl" placeholder="Ej: Cono Triple Arcoíris" />
            {errors.nombre && <p className="text-[#ba1a1a] text-xs mt-1">{errors.nombre}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-[#191c1d] font-medium">Descripción</Label>
            <Textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="bg-[#f3f4f5] border-none rounded-xl resize-none" placeholder="Breve descripción del producto" rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#191c1d] font-medium">Precio (S/) <span className="text-[#ba1a1a]">*</span></Label>
              <Input type="number" min="0" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} className="bg-[#f3f4f5] border-none rounded-xl" placeholder="0.00" />
              {errors.precio && <p className="text-[#ba1a1a] text-xs mt-1">{errors.precio}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-[#191c1d] font-medium">Stock</Label>
              <Input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} className="bg-[#f3f4f5] border-none rounded-xl" placeholder="0" />
              {errors.stock && <p className="text-[#ba1a1a] text-xs mt-1">{errors.stock}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#191c1d] font-medium">Imagen</Label>
            <div className="flex items-center gap-3">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="flex items-center gap-2 px-4 py-2.5 bg-[#f3f4f5] hover:bg-[#e7e8e9] rounded-xl text-sm font-medium text-[#564245] transition-all disabled:opacity-50">
                <Upload className="w-4 h-4" /> {uploading ? "Subiendo..." : "Subir imagen"}
              </motion.button>
              <span className="text-xs text-gray-400">o URL</span>
            </div>

            <AnimatePresence>
              {uploadProgress > 0 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div className="bg-gradient-to-r from-[#ff6b9d] to-[#ffd93d] h-full rounded-full" style={{ width: `${uploadProgress}%` }} />
                </motion.div>
              )}
            </AnimatePresence>

            <Input value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} className="bg-[#f3f4f5] border-none rounded-xl" placeholder="https://ejemplo.com/imagen.jpg" />

            {imagenUrl && (imagenUrl.match(/^https?:\/\/.+/i) || imagenUrl.startsWith("/uploads/")) && (
              <div className="relative mt-2 rounded-xl overflow-hidden w-32 h-32 border border-[#e1e3e4] group">
                <img src={imagenUrl} alt="Vista previa" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <button type="button" onClick={() => setImagenUrl("")} className="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between rounded-xl bg-[#f3f4f5] px-4 py-3">
            <Label className="text-[#191c1d] font-medium cursor-pointer">Disponible</Label>
            <Switch checked={disponible} onCheckedChange={setDisponible} />
          </div>

          <div className="flex items-center justify-between rounded-xl bg-[#f3f4f5] px-4 py-3">
            <Label className="text-[#191c1d] font-medium cursor-pointer">Destacado</Label>
            <Switch checked={destacado} onCheckedChange={setDestacado} />
          </div>
        </div>

        <DialogFooter className="gap-3 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl border-[#e1e3e4] text-[#564245]">Cancelar</Button>
          <Button onClick={handleSubmit} disabled={loading || uploading} className="bg-[#ff7e9d] text-[#761235] hover:bg-[#ff6b9d] rounded-xl font-bold shadow-sm px-6">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#761235] border-t-transparent rounded-full animate-spin" />
                {isEditing ? "Actualizando..." : "Guardando..."}
              </span>
            ) : (isEditing ? "Actualizar Producto" : "Guardar Producto")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
