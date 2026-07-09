package com.heladeria.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    @Value("${upload.dir:uploads}")
    private String uploadDir;

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(Paths.get(uploadDir));
        } catch (IOException e) {
            throw new RuntimeException("No se pudo crear el directorio de uploads: " + uploadDir);
        }
    }

    @PostMapping("/imagen")
    public ResponseEntity<Map<String, String>> subirImagen(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "El archivo está vacío"));
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Solo se permiten imágenes"));
        }

        if (file.getSize() > 5 * 1024 * 1024) {
            return ResponseEntity.badRequest().body(Map.of("error", "La imagen no debe superar los 5MB"));
        }

        try {
            String extension = contentType.split("/")[1];
            String filename = UUID.randomUUID().toString() + "." + extension;
            Path path = Paths.get(uploadDir, filename);
            Files.copy(file.getInputStream(), path);

            String url = "/uploads/" + filename;
            return ResponseEntity.ok(Map.of(
                "url", url,
                "filename", filename,
                "mensaje", "Imagen subida correctamente"
            ));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Error al subir la imagen"));
        }
    }

    @GetMapping("/imagenes")
    public ResponseEntity<List<Map<String, String>>> listarImagenes() {
        try {
            Path dir = Paths.get(uploadDir);
            if (!Files.exists(dir)) {
                return ResponseEntity.ok(Collections.emptyList());
            }
            List<Map<String, String>> imagenes = Files.list(dir)
                .filter(Files::isRegularFile)
                .map(p -> {
                    String filename = p.getFileName().toString();
                    String url = "/uploads/" + filename;
                    try {
                        long size = Files.size(p);
                        String type = Files.probeContentType(p);
                        return Map.of("filename", filename, "url", url,
                            "size", String.valueOf(size),
                            "type", type != null ? type : "unknown");
                    } catch (IOException e) {
                        return Map.of("filename", filename, "url", url, "size", "0", "type", "unknown");
                    }
                })
                .collect(Collectors.toList());
            return ResponseEntity.ok(imagenes);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Collections.emptyList());
        }
    }

    @DeleteMapping("/imagen/{filename}")
    public ResponseEntity<Map<String, String>> eliminarImagen(@PathVariable String filename) {
        try {
            Path path = Paths.get(uploadDir, filename);
            if (!Files.exists(path)) {
                return ResponseEntity.badRequest().body(Map.of("error", "La imagen no existe"));
            }
            Files.delete(path);
            return ResponseEntity.ok(Map.of("mensaje", "Imagen eliminada correctamente"));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Error al eliminar la imagen"));
        }
    }
}
