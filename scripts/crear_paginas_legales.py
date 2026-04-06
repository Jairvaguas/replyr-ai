import os
import subprocess

def get_base_path():
    return os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

def run_cmd(cmd):
    result = subprocess.run(cmd, cwd=get_base_path(), shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        raise Exception(f"Command failed: {cmd}\nOutput: {result.stdout}\nError: {result.stderr}")
    return result.stdout

def replace_in_file(filepath, content_old, content_new):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if content_old in content:
        content = content.replace(content_old, content_new)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
    else:
        print(f"Warning: could not find target string in {filepath}")

def main():
    base_path = get_base_path()
    app_path = os.path.join(base_path, 'app')
    privacidad_dir = os.path.join(app_path, 'privacidad')
    terminos_dir = os.path.join(app_path, 'terminos')
    
    os.makedirs(privacidad_dir, exist_ok=True)
    os.makedirs(terminos_dir, exist_ok=True)
    
    privacidad_path = os.path.join(privacidad_dir, 'page.tsx')
    terminos_path = os.path.join(terminos_dir, 'page.tsx')
    page_tsx_path = os.path.join(app_path, 'page.tsx')

    privacidad_content = """import Link from 'next/link';
import Image from 'next/image';

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      <header className="w-full border-b border-slate-200 py-4">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Resplyr Logo" height={32} width={0} sizes="100vw" className="h-8 w-auto object-contain" unoptimized />
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Política de Privacidad</h1>
        <p className="text-sm text-slate-500 mb-8 pb-8 border-b border-slate-200">Fecha de última actualización: abril 2026</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">¿Qué información recopilamos?</h2>
            <p>Recopilamos información básica para el funcionamiento del servicio, que incluye tu dirección de email, nombre, tokens de acceso temporales de Google Business Profile, y las reseñas asociadas a tu negocio.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">¿Cómo usamos tu información?</h2>
            <p>Utilizamos tu información exclusivamente para generar respuestas con IA a través de nuestros sistemas, enviarte alertas por email sobre nuevas reseñas que lleguen a tus ubicaciones, y gestionar tu suscripción y acceso a la plataforma.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">¿Compartimos tu información?</h2>
            <p>No vendemos tus datos a terceros bajo ninguna circunstancia. Utilizamos proveedores de primer nivel para poder ofrecer el servicio: Anthropic (para la generación de IA), Supabase (como base de datos segura), Clerk (para la autenticación), Mercado Pago (para procesar pagos) y Resend (para comunicaciones por email).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Tus datos de Google</h2>
            <p>Solicitamos acceso de solo lectura o los mínimos necesarios para poder ver y responder reseñas, siempre mediante el sistema oficial de autenticación de Google. No modificamos la información de tu perfil. Puedes revocar este acceso en cualquier momento directamente desde los ajustes de seguridad de tu cuenta de Google.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Cookies</h2>
            <p>Solo utilizamos cookies de sesión que son estrictamente necesarias para el sistema de autenticación de la plataforma. No usamos cookies intrusivas de rastreo para publicidad.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Retención de datos</h2>
            <p>Mantenemos tus datos seguros mientras tengas una cuenta activa en Resplyr. Si decides cancelar o eliminar tu cuenta, puedes solicitar la eliminación permanente de toda la información escribiendo un correo a info@resplyr.com.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contacto</h2>
            <p>Si tienes cualquier duda, pregunta o solicitud sobre nuestra política de privacidad, puedes contactarnos en <a href="mailto:info@resplyr.com" className="text-blue-600 hover:underline">info@resplyr.com</a>.</p>
          </section>
        </div>
      </main>

      <footer className="w-full border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          © 2026 Resplyr. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
"""

    terminos_content = """import Link from 'next/link';
import Image from 'next/image';

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      <header className="w-full border-b border-slate-200 py-4">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Resplyr Logo" height={32} width={0} sizes="100vw" className="h-8 w-auto object-contain" unoptimized />
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Términos del Servicio</h1>
        <p className="text-sm text-slate-500 mb-8 pb-8 border-b border-slate-200">Fecha: abril 2026</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">El servicio</h2>
            <p>Resplyr es una herramienta tecnológica impulsada por inteligencia artificial diseñada específicamente para facilitar la gestión, respuesta y monitoreo de reseñas para negocios locales.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Tu cuenta</h2>
            <p>Al registrarte en Resplyr, adquieres la responsabilidad exclusiva de mantener la seguridad y confidencialidad de tus credenciales y cuenta de acceso. Cualquier actividad realizada desde tu cuenta se considerará tu responsabilidad.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Uso aceptable</h2>
            <p>Te comprometes a utilizar Resplyr de buena fe. No está permitido utilizar nuestra plataforma para generar spam, fomentar o publicar reseñas falsas, o llevar a cabo cualquier tipo de actividad de carácter ilegal o contraria a las directrices de la comunidad de Google.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Suscripción y pagos</h2>
            <p>El uso del servicio requiere el cobro mensual o de acuerdo a la periodicidad del plan elegido. Puedes realizar la cancelación de tu suscripción en cualquier momento, de forma autónoma, dirigiéndote a la sección de Configuración (Settings) en tu panel de control, sin penalizaciones.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitación de responsabilidad</h2>
            <p>Aunque nuestra plataforma ayuda activamente a mejorar los tiempos de respuesta e interacción con el cliente, Resplyr no garantiza ni puede prometer obtener resultados específicos de posicionamiento, SEO o incremento de ingresos dentro del entorno de Google Maps y las búsquedas.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Cambios al servicio</h2>
            <p>En el curso de operaciones nuestro software se actualiza. Nos reservamos en todo momento el derecho a modificar, suspender o discontinuar partes del servicio. Implementaremos el aviso previo razonable en caso de cambios sustanciales a las herramientas principales.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contacto</h2>
            <p>Si tienes dudas sobre estos términos, por favor, ponte en contacto enviando un correo a <a href="mailto:info@resplyr.com" className="text-blue-600 hover:underline">info@resplyr.com</a>.</p>
          </section>
        </div>
      </main>

      <footer className="w-full border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          © 2026 Resplyr. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
"""

    with open(privacidad_path, 'w', encoding='utf-8') as f:
        f.write(privacidad_content)
    print(f"Created {privacidad_path}")

    with open(terminos_path, 'w', encoding='utf-8') as f:
        f.write(terminos_content)
    print(f"Created {terminos_path}")

    # Replace links in app/page.tsx
    replace_in_file(page_tsx_path, 
                    '<Link href="#" className="text-sm hover:text-white transition-colors">Política de Privacidad</Link>',
                    '<Link href="/privacidad" className="text-sm hover:text-white transition-colors">Política de Privacidad</Link>')

    replace_in_file(page_tsx_path, 
                    '<Link href="#" className="text-sm hover:text-white transition-colors">Términos del Servicio</Link>',
                    '<Link href="/terminos" className="text-sm hover:text-white transition-colors">Términos del Servicio</Link>')
    
    print("Updated app/page.tsx")

    # Run git commands
    print("Running git commands...")
    try:
        run_cmd("git add .")
        run_cmd('git commit -m "feat: agregar paginas de privacidad y terminos"')
        run_cmd("git push")
        print("Git push complete.")
    except Exception as e:
        print(f"Git error: {e}")

if __name__ == '__main__':
    main()
