# Directiva: Mejorar prompt IA con información de negocio

## Objetivo
Optimizar la generación de respuestas de IA incluyendo el nombre, dirección y el tipo de negocio de la ubicación. Además de añadir el campo en base de datos y un paso de onboarding para recolectar el tipo de negocio.

## Pasos de Ejecución
1. Actualizar `app/api/reviews/generate-reply/route.ts` para extraer `location` desde `supabaseServer` sumpliendo las columnas `name, address, business_type`.
2. Actualizar el prompt en el mismo archivo para utilizar los atributos del negocio (ubicado en `business_type` o por defecto 'negocio local').
3. Crear el archivo `supabase/migrations/0004_business_type.sql` para añadir la columna `business_type`.
4. Actualizar `app/(dashboard)/dashboard/ClientDashboard.tsx` para mostrar un modal simple u opción inline tras conectar la ubicación (o cuando su `business_type` contenga 'negocio local') donde el usuario especifique su categoría (Restaurante / Clínica / etc).
5. Se ha creado la ruta parche `app/api/locations/[id]/route.ts` manualmente.
6. Reflejar estos cambios en Git mediante commit con mensaje `feat: agregar contexto de negocio al prompt de IA`.

## Restricciones y Casos Borde
- Asegurarse de realizar un buen join/query para `locations`.
- Cuidado con variables de entorno o contextos faltantes de TS, asegurando los tipos adecuados en el cliente.
- Asegurar que React hook y JSX se actualicen bien en `ClientDashboard.tsx`.
