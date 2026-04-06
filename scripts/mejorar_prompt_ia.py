import os
import subprocess
import re

def get_base_path():
    return os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

def run_cmd(cmd):
    result = subprocess.run(cmd, cwd=get_base_path(), shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        raise Exception(f"Command failed: {cmd}\nOutput: {result.stdout}\nError: {result.stderr}")
    return result.stdout

def replace_in_file(filepath, content_old_regex, content_new):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = re.sub(content_old_regex, content_new, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {filepath}")

def main():
    base_path = get_base_path()
    
    # Update app/api/reviews/generate-reply/route.ts
    route_path = os.path.join(base_path, 'app', 'api', 'reviews', 'generate-reply', 'route.ts')
    
    with open(route_path, 'r', encoding='utf-8') as f:
        route_code = f.read()
        
    old_code = """  if (error || !review) return NextResponse.json({ error: "Reseña no encontrada" }, { status: 404 });

  const promptText = `Eres el asistente de respuestas de un negocio local. """
  
    new_code = """  if (error || !review) return NextResponse.json({ error: "Reseña no encontrada" }, { status: 404 });

  const { data: location } = await supabaseServer
    .from('locations')
    .select('name, address, business_type')
    .eq('id', review.location_id)
    .single();

  const promptText = `Eres el asistente de respuestas de "${location?.name || 'un negocio local'}", 
un negocio ubicado en ${location?.address || 'Latinoamérica'}.
Tipo de negocio: ${location?.business_type || 'negocio local'}.

Tu tarea es redactar una respuesta profesional, cálida y auténtica a la siguiente reseña de Google. """
    
    if old_code in route_code:
        route_code = route_code.replace(old_code, new_code)
        with open(route_path, 'w', encoding='utf-8') as f:
            f.write(route_code)
        print("Updated route.ts prompt and query.")
    else:
        print("Failed to replace in route.ts")

    # Update app/(dashboard)/dashboard/ClientDashboard.tsx
    dash_path = os.path.join(base_path, 'app', '(dashboard)', 'dashboard', 'ClientDashboard.tsx')
    
    with open(dash_path, 'r', encoding='utf-8') as f:
        dash_code = f.read()

    dash_code = dash_code.replace('import { useState } from "react";', 'import { useState, useEffect } from "react";')
    
    # insert state and useeffect
    insert_after = """  const [activeLocationId, setActiveLocationId] = useState<string | null>(
    locations.length > 0 ? locations[0].id : null
  );"""
  
    states_content = """
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [businessType, setBusinessType] = useState("");
  const [customType, setCustomType] = useState("");
  const [isSavingType, setIsSavingType] = useState(false);

  const options = [
    "Restaurante / Cafetería",
    "Clínica / Consultorio",
    "Salón de belleza / Spa",
    "Taller / Servicio técnico",
    "Hotel / Hospedaje",
    "Tienda / Comercio",
    "Otro"
  ];

  const activeLocation = locations.find(l => l.id === activeLocationId);

  useEffect(() => {
    if (activeLocation && (!activeLocation.business_type || activeLocation.business_type === 'negocio local')) {
      setShowTypeModal(true);
      setBusinessType("");
      setCustomType("");
    } else {
      setShowTypeModal(false);
    }
  }, [activeLocation]);
"""
    if insert_after in dash_code and "setShowTypeModal" not in dash_code:
        dash_code = dash_code.replace(insert_after, insert_after + "\n" + states_content)

    # insert modal UI 
    insert_modal_after = """<div className="min-h-screen bg-slate-50 flex w-full">"""
    modal_ui = """
      {showTypeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Cuéntanos sobre tu negocio</h3>
            <p className="text-slate-600 mb-6">Para que la IA genere respuestas perfectas, indícanos qué tipo de negocio es <strong>{activeLocation?.name}</strong>.</p>
            
            <div className="space-y-3 mb-6">
              {options.map(opt => (
                <label key={opt} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors ${businessType === opt ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200'}`}>
                  <input type="radio" name="btype" value={opt} checked={businessType === opt} onChange={() => setBusinessType(opt)} className="w-5 h-5 text-blue-600 focus:ring-blue-600" />
                  <span className="font-medium text-slate-700">{opt}</span>
                </label>
              ))}
              
              {businessType === "Otro" && (
                <input 
                  type="text" 
                  placeholder="Ej: Agencia de marketing, Gimnasio..." 
                  className="w-full mt-2 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value)}
                />
              )}
            </div>

            <button 
              onClick={async () => {
                const finalType = businessType === "Otro" ? customType : businessType;
                if (!finalType.trim()) return;
                
                setIsSavingType(true);
                try {
                  const res = await fetch(`/api/locations/${activeLocationId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ business_type: finalType })
                  });
                  if (res.ok) {
                    setShowTypeModal(false);
                    if (activeLocation) {
                      activeLocation.business_type = finalType;
                    }
                  }
                } catch (e) {
                  console.error(e);
                } finally {
                  setIsSavingType(false);
                }
              }}
              disabled={!businessType || (businessType === "Otro" && !customType.trim()) || isSavingType}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSavingType ? "Guardando..." : "Guardar y continuar"}
            </button>
          </div>
        </div>
      )}
"""
    if insert_modal_after in dash_code and "showTypeModal &&" not in dash_code:
        dash_code = dash_code.replace(insert_modal_after, insert_modal_after + "\n" + modal_ui)
        with open(dash_path, 'w', encoding='utf-8') as f:
            f.write(dash_code)
        print("Updated ClientDashboard.tsx ui and state.")
    else:
        print("Failed to replace in ClientDashboard.tsx")

    # Generate SQL
    sql_dir = os.path.join(base_path, 'supabase', 'migrations')
    os.makedirs(sql_dir, exist_ok=True)
    sql_path = os.path.join(sql_dir, '0004_business_type.sql')
    with open(sql_path, 'w', encoding='utf-8') as f:
        f.write("ALTER TABLE public.locations \nADD COLUMN IF NOT EXISTS business_type text DEFAULT 'negocio local';")
    print("Created sql file.")

    # Run git commands
    print("Running git commands...")
    try:
        run_cmd("git add .")
        run_cmd('git commit -m "feat: agregar contexto de negocio al prompt de IA"')
        run_cmd("git push")
        print("Git push complete.")
    except Exception as e:
        print(f"Git error: {e}")

if __name__ == '__main__':
    main()
