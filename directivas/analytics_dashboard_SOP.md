# Analytics de Reseñas SOP

## Objetivo
Implementar la sección de analytics en el dashboard de clientes, mostrando métricas de reseñas a nivel de ubicación.

## Entradas
- API: locationId, userId
- Componente: Prop locations (activeLocationId), userId

## Salidas
- app/api/analytics/route.ts (Nueva API de supabase)
- components/dashboard/AnalyticsSection.tsx (Componente Recharts)
- Modificación en app/(dashboard)/dashboard/ClientDashboard.tsx

## Lógica
1. Route obtendrá datos de la base de datos `reviews` con Supabase (SERVICE_ROLE_KEY).
2. AnalyticsSection consumirá la ruta API usando activeLocationId.
3. Se mostrarán 4 tarjetas (Cards):
 - BarChart apiladas (Mes vs Respondidas/Pendientes)
 - LineChart (Rating Promedio por Mes)
 - BarChart horizontal (Distribución de Ratings: 1 a 5)
 - Tarjeta (Tiempo promedio de respuesta IA, basado en review_date y ai_reply_generated_at)

## Trampas / Casos Borde Identificados
- Estado vacío cuando no hay suficientes datos: "Aún no hay suficientes datos para mostrar analytics".
- TypeScript: userId de Clerk/Supabase debe pasarse correctamente a <ClientDashboard>.
