'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Cell } from 'recharts';
import { Clock } from 'lucide-react';

interface AnalyticsData {
  respondidas_vs_pendientes: { mes: string; respondidas: number; pendientes: number }[];
  rating_promedio_por_mes: { mes: string; rating: number | null }[];
  distribucion_ratings: { "1": number; "2": number; "3": number; "4": number; "5": number; };
  tiempo_promedio_respuesta_horas: number;
}

interface Props {
  locationId: string | null;
  userId: string | undefined | null;
  locationName: string;
}

export default function AnalyticsSection({ locationId, userId, locationName }: Props) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!locationId || !userId) {
       setIsLoading(false);
       return;
    }
    
    setIsLoading(true);
    fetch(`/api/analytics?locationId=${locationId}&userId=${userId}`)
      .then(res => res.json())
      .then(d => {
        setData(d);
        setIsLoading(false);
      })
      .catch(e => {
        console.error(e);
        setIsLoading(false);
      });
  }, [locationId, userId]);

  if (isLoading) {
      return <div className="mt-8 animate-pulse bg-slate-200 h-64 rounded-xl w-full"></div>;
  }

  // Determine if empty
  const isDataEmpty = !data || (
    data.respondidas_vs_pendientes.reduce((acc, crr) => acc + crr.respondidas + crr.pendientes, 0) === 0 &&
    Object.values(data.distribucion_ratings).every(v => v === 0)
  );

  if (isDataEmpty || !data) {
    return (
      <div className="mt-8 p-8 bg-white border border-slate-200 rounded-xl text-center text-slate-500 shadow-sm">
        Aún no hay suficientes datos para mostrar analytics
      </div>
    );
  }

  // Distribución format
  const distribucionData = [
    { rating: '5 ★', count: data.distribucion_ratings["5"], fill: '#16A34A' },
    { rating: '4 ★', count: data.distribucion_ratings["4"], fill: '#84CC16' },
    { rating: '3 ★', count: data.distribucion_ratings["3"], fill: '#FACC15' },
    { rating: '2 ★', count: data.distribucion_ratings["2"], fill: '#F97316' },
    { rating: '1 ★', count: data.distribucion_ratings["1"], fill: '#EF4444' },
  ];

  return (
    <div className="mt-12 w-full flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Analytics de reseñas</h2>
        <p className="text-slate-500">Últimos 6 meses · {locationName || "Ubicación"}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {/* Card 1: Respondidas vs Pendientes */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Respondidas vs Pendientes</h3>
          <div className="h-64 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.respondidas_vs_pendientes} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <RechartsTooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="respondidas" stackId="a" fill="#2563EB" radius={[0, 0, 4, 4]} name="Respondidas" />
                <Bar dataKey="pendientes" stackId="a" fill="#E2E8F0" radius={[4, 4, 0, 0]} name="Pendientes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Rating Promedio por mes */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Rating Promedio Mensual</h3>
          <div className="h-64 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.rating_promedio_por_mes} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <RechartsTooltip cursor={{ stroke: '#CBD5E1', strokeWidth: 1, strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="rating" stroke="#16A34A" strokeWidth={3} dot={{ r: 4, fill: '#16A34A', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} name="Rating ★" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3: Distribución de Ratings */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribución de Ratings</h3>
          <div className="h-64 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={distribucionData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis dataKey="rating" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#475569', fontWeight: 500 }} width={80} />
                <RechartsTooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} name="Cantidad">
                   {distribucionData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.fill} />
                   ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 4: Tiempo Promedio de Respuesta */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Clock size={160} />
          </div>
          <div className="z-10 flex flex-col items-center text-center">
            <div className="bg-blue-50 p-4 rounded-full mb-4">
              <Clock className="text-blue-600 w-8 h-8" />
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">Tiempo promedio de respuesta IA</p>
            <div className="flex items-baseline gap-2">
               <span className="text-5xl font-bold tracking-tight text-slate-900">{data.tiempo_promedio_respuesta_horas}</span>
               <span className="text-slate-500 font-medium">horas</span>
            </div>
            <p className="text-xs text-slate-400 mt-4 leading-relaxed max-w-[200px]">Basado en el historial de reseñas respondidas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
