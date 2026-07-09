package com.heladeria.backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class PedidoWebSocketHandler extends TextWebSocketHandler {

    private final CopyOnWriteArrayList<org.springframework.web.socket.WebSocketSession> sessions =
            new CopyOnWriteArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(org.springframework.web.socket.WebSocketSession session) {
        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(org.springframework.web.socket.WebSocketSession session,
                                       CloseStatus status) {
        sessions.remove(session);
    }

    private void broadcast(TextMessage message) {
        sessions.removeIf(s -> !s.isOpen());
        for (org.springframework.web.socket.WebSocketSession session : sessions) {
            try {
                session.sendMessage(message);
            } catch (Exception e) {
                sessions.remove(session);
            }
        }
    }

    public void notificarNuevoPedido(Map<String, Object> data) {
        try {
            broadcast(new TextMessage(objectMapper.writeValueAsString(data)));
        } catch (Exception e) {
            // ignore
        }
    }

    public void notificarCambioEstado(Map<String, Object> data) {
        try {
            broadcast(new TextMessage(objectMapper.writeValueAsString(data)));
        } catch (Exception e) {
            // ignore
        }
    }
}
