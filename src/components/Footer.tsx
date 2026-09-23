export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} HHM Proyectos. Todos los derechos reservados.</p>
        <p className="text-sm">Especialistas en Plomería y Electricidad para el sector construcción.</p>
      </div>
    </footer>
  );
}
