import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = params;
  if (!id) return NextResponse.json({ error: "ID es requerido" }, { status: 400 });

  const body = await req.json();
  const { business_type } = body;

  if (!business_type) {
    return NextResponse.json({ error: "business_type es requerido" }, { status: 400 });
  }

  const { error } = await supabaseServer
    .from('locations')
    .update({ business_type })
    .eq('id', id);

  if (error) {
    console.error("Error updating location:", error);
    return NextResponse.json({ error: "Error en base de datos" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
