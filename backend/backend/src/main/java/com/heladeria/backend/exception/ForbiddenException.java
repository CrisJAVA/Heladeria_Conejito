package com.heladeria.backend.exception;

/** Lanzada cuando un usuario autenticado no tiene el rol requerido (ej. ADMIN). */
public class ForbiddenException extends RuntimeException {
    public ForbiddenException(String message) {
        super(message);
    }
}
