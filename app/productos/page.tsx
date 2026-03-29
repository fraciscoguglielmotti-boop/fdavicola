import { Metadata } from "next";
import ProductCard from "../components/ProductCard";
import { products } from "../lib/products";

export const metadata: Metadata = {
  title: "Productos | FD Avícola · Pollo y Huevos Zona Norte",
  description:
    "Catálogo de pollo fresco y huevos: pechugas, pollo entero El Fortín, huevos por docena o bandeja, packs fitness y familia. Semi-mayorista Zona Norte GBA.",
};

const WA_ORDER =
  "https://wa.me/541139467076?text=Hola%20FD%20Av%C3%ADcola%2C%20quiero%20hacer%20un%20pedido.%20Zona%20Norte.%20Mis%20productos%3A%20";

export default function ProductosPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-extrabold mb-2">Catálogo de productos</h1>
          <p className="text-gray-500">
            Pollo fresco y huevos a precio semi-mayorista. Zona Norte GBA.{" "}
            <span className="text-orange-600 font-medium">
              Consultá precio y disponibilidad por WhatsApp.
            </span>
          </p>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Custom order CTA */}
        <div className="mt-14 bg-orange-50 border border-orange-100 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">¿No encontrás lo que buscás?</h2>
          <p className="text-gray-600 text-sm mb-5 max-w-md mx-auto">
            Escribinos por WhatsApp y te armamos un pedido a medida según tu
            consumo semanal o quincenal.
          </p>
          <a
            href={WA_ORDER}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16.02 2.67c-7.2 0-13.06 5.73-13.06 12.78 0 2.26.62 4.47 1.8 6.4L3 29.33l7.73-1.99c1.92 1.02 4.08 1.56 6.3 1.56 7.2 0 13.06-5.73 13.06-12.78S23.23 2.67 16.02 2.67Zm0 23.85c-2 0-3.93-.52-5.62-1.5l-.4-.23-4.58 1.18 1.22-4.34-.27-.42a10.93 10.93 0 0 1-1.73-5.9c0-6.04 5.06-10.95 11.38-10.95s11.38 4.91 11.38 10.95-5.06 10.96-11.38 10.96Zm6.36-8.22c-.35-.17-2.08-1.02-2.4-1.14-.32-.12-.55-.17-.78.17-.23.35-.9 1.14-1.1 1.37-.2.23-.4.26-.75.09-.35-.17-1.47-.53-2.8-1.69-1.04-.9-1.74-2.01-1.94-2.36-.2-.35-.02-.54.15-.71.15-.15.35-.4.52-.6.17-.2.23-.35.35-.57.12-.23.06-.43-.03-.6-.09-.17-.78-1.83-1.07-2.5-.28-.66-.56-.57-.78-.58h-.67c-.23 0-.6.09-.92.43-.32.35-1.21 1.17-1.21 2.86s1.24 3.33 1.42 3.56c.17.23 2.45 3.85 5.94 5.4.83.36 1.48.58 1.99.75.84.26 1.61.22 2.22.13.68-.1 2.08-.84 2.37-1.65.29-.81.29-1.5.2-1.65-.09-.15-.32-.24-.67-.41Z" />
            </svg>
            Consultar pedido personalizado
          </a>
        </div>
      </div>
    </div>
  );
}
