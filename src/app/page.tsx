import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-950 text-white py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Especialistas en Plomería y Electricidad para el Sector Construcción
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl leading-relaxed">
              El aliado estratégico en el que confían arquitectos y constructoras para diseños e instalaciones rápidas, eficientes y seguras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contacto" 
                className="inline-flex justify-center items-center px-8 py-4 bg-white text-blue-950 font-bold rounded-md hover:bg-gray-100 transition shadow-lg text-lg"
              >
                Solicitar Cotización
              </Link>
              <Link 
                href="/servicios" 
                className="inline-flex justify-center items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-md hover:bg-white hover:text-blue-950 transition text-lg"
              >
                Conoce Nuestros Servicios
              </Link>
            </div>
          </div>
        </div>
        {/* Simple decorative element */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-blue-900 opacity-20 transform -skew-x-12 translate-x-32 hidden md:block"></div>
      </section>

      {/* Trust / Features Section */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Por qué elegir a HHM Proyectos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-blue-950 mb-3">Experiencia Especializada</h3>
              <p className="text-gray-600">Conocemos las exigencias de arquitectos y desarrolladores. Cumplimos tiempos y normativas estrictas.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-blue-950 mb-3">Soluciones Integrales</h3>
              <p className="text-gray-600">Diseño, cálculo e instalación en plomería y electricidad, todo centralizado con un solo proveedor.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-blue-950 mb-3">Estándares de Calidad</h3>
              <p className="text-gray-600">Uso de materiales certificados y procesos rigurosos para garantizar la seguridad y eficiencia del proyecto.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
