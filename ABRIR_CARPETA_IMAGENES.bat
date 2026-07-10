@echo off
title Heladeria Conejito - Carpeta de Imagenes
start "" "%~dp0backend\backend\uploads"
echo.
echo ============================================
echo   CARPETA DE IMAGENES - Heladeria Conejito
echo ============================================
echo.
echo  Coloca tus imagenes en la carpeta que se acaba de abrir.
echo.
echo  Luego, en el panel de administracion:
echo   1. Ve a "Gestionar Productos"
echo   2. Edita un producto
echo   3. Pega la URL en el campo "Imagen":
echo      http://localhost:8080/uploads/TU_IMAGEN.jpg
echo.
echo  O usa el boton "Subir imagen" para subirla desde el mismo panel.
echo.
pause
