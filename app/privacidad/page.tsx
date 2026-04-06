import Link from 'next/link';
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
