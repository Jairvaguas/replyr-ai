import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId');
    const userId = searchParams.get('userId');

    if (!locationId || !userId) {
      return NextResponse.json({ error: "Missing locationId or userId" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json({ error: "Supabase credentials missing" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('location_id', locationId)
      .eq('user_id', userId)
      .order('review_date', { ascending: false });

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!reviews || reviews.length === 0) {
      return NextResponse.json({
        respondidas_vs_pendientes: [],
        rating_promedio_por_mes: [],
        distribucion_ratings: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
        tiempo_promedio_respuesta_horas: 0
      });
    }

    // Calcular analytics para los ultimos 6 meses
    const now = new Date();
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const last6Months = [];
    
    // Generar las claves de mes en el formato YYYY-M de los ultimos 6 meses
    for (let i = 5; i >= 0; i--) {
      // Necesitamos asegurar el mes correcto restando los meses
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last6Months.push({
        monthKey: `${d.getFullYear()}-${d.getMonth()}`,
        mes: monthNames[d.getMonth()]
      });
    }

    const respondidasVsPendientes = last6Months.map(m => ({ mes: m.mes, respondidas: 0, pendientes: 0, monthKey: m.monthKey }));
    const ratingPorMesData = last6Months.map(m => ({ mes: m.mes, sum: 0, count: 0, monthKey: m.monthKey }));
    
    const distribucion = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
    
    let totalRespuestasDelay = 0;
    let respuestasCountForDelay = 0;

    reviews.forEach(r => {
      // Parsear la fecha del review
      const d = new Date(r.review_date);
      if (isNaN(d.getTime())) return;
      
      const rKey = `${d.getFullYear()}-${d.getMonth()}`;
      
      // Distribucion global
      const rating = Math.floor(r.rating);
      if (rating >= 1 && rating <= 5) {
        distribucion[rating.toString() as "1"|"2"|"3"|"4"|"5"] += 1;
      }

      // Sumar al mes si corresponde
      const index = respondidasVsPendientes.findIndex(m => m.monthKey === rKey);
      if (index !== -1) {
        if (r.replied) {
          respondidasVsPendientes[index].respondidas += 1;
        } else {
          respondidasVsPendientes[index].pendientes += 1;
        }
        
        ratingPorMesData[index].sum += r.rating;
        ratingPorMesData[index].count += 1;
      }

      // Tiempo promedio si esta respondida
      if (r.replied && r.ai_reply_generated_at && r.review_date) {
         const reviewTime = new Date(r.review_date).getTime();
         const replyTime = new Date(r.ai_reply_generated_at).getTime();
         if (!isNaN(reviewTime) && !isNaN(replyTime)) {
             const diffHours = (replyTime - reviewTime) / (1000 * 60 * 60);
             if (diffHours >= 0) {
                totalRespuestasDelay += diffHours;
                respuestasCountForDelay += 1;
             }
         }
      }
    });

    const rating_promedio_por_mes = ratingPorMesData.map(m => ({
      mes: m.mes,
      rating: m.count > 0 ? Number((m.sum / m.count).toFixed(1)) : null
    }));

    const respondidas_vs_pendientes = respondidasVsPendientes.map(m => ({ 
      mes: m.mes, 
      respondidas: m.respondidas, 
      pendientes: m.pendientes 
    }));

    const tiempo_promedio_respuesta_horas = respuestasCountForDelay > 0 
      ? Math.round(totalRespuestasDelay / respuestasCountForDelay) 
      : 0;

    return NextResponse.json({
      respondidas_vs_pendientes,
      rating_promedio_por_mes,
      distribucion_ratings: distribucion,
      tiempo_promedio_respuesta_horas
    });
  } catch (error) {
    console.error("Endpoint Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
