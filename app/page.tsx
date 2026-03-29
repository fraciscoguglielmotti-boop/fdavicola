import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { featuredProducts } from "./lib/products";

const WA_ORDER =
  "https://wa.me/541139467076?text=Hola%20FD%20Av%C3%ADcola%2C%20quiero%20hacer%20un%20pedido%20semi-mayorista.%20Zona%20Norte.";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
              Zona Norte GBA · Semi-mayorista
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Pollo fresco y huevos{" "}
              <span className="text-orange-500">a precio conveniente</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ideal para <strong>familias</strong> que compran en cantidad y{" "}
              <strong>personas fitness</strong> que consumen pechugas y huevos
              cada semana. Pedido rápido por WhatsApp, entrega en zona norte.
            </p>

            <ul className="flex flex-col gap-2 text-sm text-gray-700">
              {[
                "Pechugas frescas sin hueso · packs desde 2 kg",
                "Huevos por docena o bandeja de 30",
                "Pollo entero El Fortín · refrigerado",
                "Combos familia y fitness disponibles",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href={WA_ORDER}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors flex items-center gap-2 text-sm"
              >
                <WhatsAppIcon />
                Hacer pedido ahora
              </a>
              <Link
                href="/productos"
                className="border border-gray-300 hover:border-orange-400 text-gray-700 hover:text-orange-600 font-semibold px-6 py-3 rounded-full transition-colors text-sm"
              >
                Ver todos los productos
              </Link>
            </div>
          </div>

          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/hero.jpg"
              alt="Pollo fresco FD Avícola"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Targets */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6 flex gap-4 items-start">
              <span className="text-3xl">💪</span>
              <div>
                <h2 className="font-bold text-lg mb-1">Para personas fitness</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Comprá pechugas y huevos en cantidad para toda la semana. Proteína
                  de calidad, precio semi-mayorista. Organizás tu meal prep de una sola vez.
                </p>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex gap-4 items-start">
              <span className="text-3xl">👨‍👩‍👧‍👦</span>
              <div>
                <h2 className="font-bold text-lg mb-1">Para familias</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Abastecete de pollo y huevos para la semana entera. Ahorrás
                  comprando más de una vez y tenés producto fresco siempre disponible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-3">Productos destacados</h2>
            <p className="text-gray-500">Consultá disponibilidad y precio por WhatsApp. Respondemos rápido.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/productos"
              className="inline-block border-2 border-orange-400 text-orange-600 hover:bg-orange-400 hover:text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-3">¿Cómo funciona?</h2>
            <p className="text-gray-500">Pedido en 3 pasos, sin complicaciones.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: "📋",
                title: "Elegís los productos",
                desc: "Revisá el catálogo y anotá qué querés pedir: pechugas, huevos, pollo entero o un combo.",
              },
              {
                step: "2",
                icon: "💬",
                title: "Mandás el pedido por WhatsApp",
                desc: "Nos escribís por WhatsApp con tu pedido y zona. Te respondemos con precio y disponibilidad al toque.",
              },
              {
                step: "3",
                icon: "🚚",
                title: "Coordinamos la entrega",
                desc: "Acordamos día y horario. Entregamos fresco, con cadena de frío garantizada.",
              },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="text-center flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                  {icon}
                </div>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href={WA_ORDER}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full transition-colors inline-flex items-center gap-2"
            >
              <WhatsAppIcon />
              Empezar pedido
            </a>
          </div>
        </div>
      </section>

      {/* Trust banner */}
      <section className="bg-orange-500 py-12 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            Calidad y frescura garantizada
          </h2>
          <p className="text-orange-100 leading-relaxed mb-6">
            Trabajamos con pollo refrigerado El Fortín y huevos frescos seleccionados.
            Cadena de frío en todo el recorrido. Sin intermediarios.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
            {["Pollo refrigerado El Fortín", "Huevos frescos de calidad", "Cadena de frío controlada", "Zona Norte GBA"].map(
              (item) => (
                <span key={item} className="flex items-center gap-1">
                  <span>✓</span> {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16.02 2.67c-7.2 0-13.06 5.73-13.06 12.78 0 2.26.62 4.47 1.8 6.4L3 29.33l7.73-1.99c1.92 1.02 4.08 1.56 6.3 1.56 7.2 0 13.06-5.73 13.06-12.78S23.23 2.67 16.02 2.67Zm0 23.85c-2 0-3.93-.52-5.62-1.5l-.4-.23-4.58 1.18 1.22-4.34-.27-.42a10.93 10.93 0 0 1-1.73-5.9c0-6.04 5.06-10.95 11.38-10.95s11.38 4.91 11.38 10.95-5.06 10.96-11.38 10.96Zm6.36-8.22c-.35-.17-2.08-1.02-2.4-1.14-.32-.12-.55-.17-.78.17-.23.35-.9 1.14-1.1 1.37-.2.23-.4.26-.75.09-.35-.17-1.47-.53-2.8-1.69-1.04-.9-1.74-2.01-1.94-2.36-.2-.35-.02-.54.15-.71.15-.15.35-.4.52-.6.17-.2.23-.35.35-.57.12-.23.06-.43-.03-.6-.09-.17-.78-1.83-1.07-2.5-.28-.66-.56-.57-.78-.58h-.67c-.23 0-.6.09-.92.43-.32.35-1.21 1.17-1.21 2.86s1.24 3.33 1.42 3.56c.17.23 2.45 3.85 5.94 5.4.83.36 1.48.58 1.99.75.84.26 1.61.22 2.22.13.68-.1 2.08-.84 2.37-1.65.29-.81.29-1.5.2-1.65-.09-.15-.32-.24-.67-.41Z" />
    </svg>
  );
}
