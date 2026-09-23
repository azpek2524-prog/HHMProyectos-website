import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-blue-950 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.jpeg" 
                alt="HHM Proyectos Logo" 
                width={80} 
                height={80} 
                className="object-contain rounded-md bg-white p-1" 
              />
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="hover:text-blue-200 transition font-medium">Empresa</Link>
            <Link href="/servicios" className="hover:text-blue-200 transition font-medium">Servicios</Link>
            <Link href="/proyectos" className="hover:text-blue-200 transition font-medium">Portafolio</Link>
            <Link href="/contacto" className="hover:text-blue-200 transition font-medium">Contacto</Link>
            <Link href="/contacto" className="bg-white text-blue-950 px-5 py-2 rounded-md hover:bg-gray-100 transition font-bold shadow-sm">
              Solicitar Cotización
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
