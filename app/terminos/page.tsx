import Link from 'next/link';
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
