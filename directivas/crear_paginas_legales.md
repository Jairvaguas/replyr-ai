# Directiva: Crear Páginas Legales (Privacidad y Términos)

## Objetivo
Implementar las páginas de Política de Privacidad (`/privacidad`) y Términos del Servicio (`/terminos`) en la aplicación Next.js y actualizar los enlaces correspondientes en el footer de `app/page.tsx`, para luego hacer commit y push de estos cambios.

## Pasos de Ejecución
1. Crear el archivo `app/privacidad/page.tsx` con el contenido legal de privacidad proporcionado, usando el componente Navbar con el logo y un footer básico.
2. Crear el archivo `app/terminos/page.tsx` con el contenido legal de términos del servicio proporcionado, usando la misma estructura de diseño.
3. Actualizar `app/page.tsx` para reemplazar los enlaces `#` de "Política de Privacidad" y "Términos del Servicio" por `/privacidad` y `/terminos` respectivamente.
4. Ejecutar los comandos de Git para agregar los cambios (`git add .`), hacer commit (`git commit -m "feat: agregar paginas de privacidad y terminos"`) y subirlos al repositorio (`git push`).

## Restricciones y Casos Borde
- Ninguna restricción conocida hasta el momento.
- Se debe asegurar que las rutas creadas coincidan exactamente con lo enlazado en `app/page.tsx`.
- Usar codificación UTF-8 para evitar problemas de caracteres en español (tildes, eñes) en los scripts y archivos reemplazados.
