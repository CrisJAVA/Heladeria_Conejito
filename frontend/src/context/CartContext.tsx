import { createContext, useContext, useState, useMemo, useEffect, useCallback, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { listarCarrito, agregarAlCarrito, actualizarCantidad, eliminarDelCarrito, limpiarCarrito, type CarritoDTO } from "../services/carrito";

const CART_KEY = "carrito_local";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (name: string) => void;
  updateQuantity: (name: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  syncing: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function loadLocalCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return [];
}

function saveLocalCart(items: CartItem[]) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch { /* ignore */ }
}

function mapToCartItem(dto: CarritoDTO): CartItem {
  return {
    id: dto.productoId,
    name: dto.productoNombre,
    price: dto.productoPrecio,
    image: dto.productoImagenUrl || "",
    description: dto.productoDescripcion || "",
    quantity: dto.cantidad,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, token } = useAuth();
  const [items, setItems] = useState<CartItem[]>(loadLocalCart);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    saveLocalCart(items);
  }, [items]);

  useEffect(() => {
    if (user && token) {
      setSyncing(true);
      listarCarrito()
        .then((serverItems) => {
          if (serverItems && serverItems.length > 0) {
            setItems(serverItems.map(mapToCartItem));
          } else if (items.length > 0) {
            Promise.all(items.map(i => agregarAlCarrito(i.id, i.quantity).catch(() => null)))
              .then(() => listarCarrito())
              .then((synced) => { if (synced) setItems(synced.map(mapToCartItem)); })
              .catch(() => {});
          }
        })
        .catch(() => {})
        .finally(() => setSyncing(false));
    }
  }, [user?.id]);

  const addToCart = useCallback(async (product: Omit<CartItem, "quantity">) => {
    if (user && token) {
      try {
        await agregarAlCarrito(product.id, 1);
        const serverItems = await listarCarrito();
        if (serverItems) setItems(serverItems.map(mapToCartItem));
        return;
      } catch { /* fallback to local */ }
    }
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, [user, token]);

  const removeFromCart = useCallback(async (name: string) => {
    const item = items.find(i => i.name === name);
    if (user && token && item) {
      try {
        await eliminarDelCarrito(item.id);
        const serverItems = await listarCarrito();
        if (serverItems) setItems(serverItems.map(mapToCartItem));
        return;
      } catch { /* fallback */ }
    }
    setItems((prev) => prev.filter((i) => i.name !== name));
  }, [user, token, items]);

  const updateQuantity = useCallback(async (name: string, delta: number) => {
    const item = items.find(i => i.name === name);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + delta);

    if (user && token) {
      try {
        const result = await actualizarCantidad(item.id, newQty);
        if (result === null) {
          setItems((prev) => prev.filter((i) => i.name !== name));
        } else {
          setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, quantity: newQty } : i));
        }
        return;
      } catch { /* fallback */ }
    }
    setItems((prev) =>
      prev.map((i) =>
        i.name === name ? { ...i, quantity: newQty } : i
      )
    );
  }, [user, token, items]);

  const clearCart = useCallback(async () => {
    if (user && token) {
      try {
        await limpiarCarrito();
        setItems([]);
        return;
      } catch { /* fallback */ }
    }
    setItems([]);
  }, [user, token]);

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal, syncing }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}
