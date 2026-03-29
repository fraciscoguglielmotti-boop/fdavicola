import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <p className="text-white font-semibold text-base mb-2">FD Avícola</p>
          <p className="leading-relaxed">
            Pollo fresco y huevos a precio semi-mayorista. Zona Norte GBA.
            Ideal para familias y personas fitness.
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="text-white font-semibold mb-2">Navegación</p>
          <ul className="space-y-1">
            <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
            <li><Link href="/productos" className="hover:text-white transition-colors">Productos</Link></li>
            <li><Link href="/como-comprar" className="hover:text-white transition-colors">Cómo comprar</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white font-semibold mb-2">Contacto</p>
          <ul className="space-y-1">
            <li>
              <a href="tel:+541139467076" className="hover:text-white transition-colors">
                +54 11 3946-7076
              </a>
            </li>
            <li>
              <a href="mailto:contacto@fdavicola.com" className="hover:text-white transition-colors">
                contacto@fdavicola.com
              </a>
            </li>
            <li className="mt-2">
              <a
                href="https://wa.me/541139467076"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs">
        © {year} FD Avícola. Todos los derechos reservados.
      </div>
    </footer>
  );
}
