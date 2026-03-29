import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cómo Comprar | FD Avícola · Pedido por WhatsApp",
  description:
    "Así funciona el pedido en FD Avícola: elegís productos, pedís por WhatsApp y coordinamos la entrega en Zona Norte GBA. Simple y rápido.",
};

const WA_ORDER =
  "https://wa.me/541139467076?text=Hola%20FD%20Av%C3%ADcola%2C%20quiero%20hacer%20un%20pedido.%20Zona%20Norte.";

export default function ComoComprarPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-orange-50 border-b border-orange-100">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold mb-3">¿Cómo hacer un pedido?</h1>
          <p className="text-gray-600 leading-relaxed">
            El proceso es simple. Sin apps, sin registro. Solo WhatsApp.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-3xl mx-auto px-4 py-14">
        <ol className="flex flex-col gap-10">
          {[
            {
              n: "1",
              icon: "📋",
              title: "Revisá el catálogo",
              body: (
                <>
                  Entrá a{" "}
                  <Link href="/productos" className="text-orange-600 font-medium underline">
                    Ver productos
                  </Link>{" "}
                  y elegí qué querés pedir: pechugas, pollo entero, huevos o un
                  combo. Anotá las cantidades aproximadas.
                </>
              ),
            },
            {
              n: "2",
              icon: "💬",
              title: "Escribinos por WhatsApp",
              body: (
                <>
                  Mandanos un mensaje con tu pedido y tu zona dentro de Zona Norte. Por ejemplo:{" "}
                  <em className="text-gray-700">
                    "Hola, quiero 4 kg de pechugas y una bandeja de 30 huevos. Zona: Tigre."
                  </em>{" "}
                  Te respondemos rápido con precio y disponibilidad del día.
                </>
              ),
            },
            {
              n: "3",
              icon: "💰",
              title: "Confirmás y pagás",
              body: "Acordamos el precio y coordinas el pago. Aceptamos efectivo y transferencia.",
            },
            {
              n: "4",
              icon: "🚚",
              title: "Coordinamos la entrega",
              body: "Acordamos día y horario de entrega. Entregamos con cadena de frío garantizada, producto fresco y listo para usar.",
            },
          ].map(({ n, icon, title, body }) => (
            <li key={n} className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-100 text-orange-600 font-extrabold rounded-full flex items-center justify-center text-lg">
                {n}
              </div>
              <div>
                <h2 className="font-bold text-xl mb-1">
                  {icon} {title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">{body}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href={WA_ORDER}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full text-base transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16.02 2.67c-7.2 0-13.06 5.73-13.06 12.78 0 2.26.62 4.47 1.8 6.4L3 29.33l7.73-1.99c1.92 1.02 4.08 1.56 6.3 1.56 7.2 0 13.06-5.73 13.06-12.78S23.23 2.67 16.02 2.67Zm0 23.85c-2 0-3.93-.52-5.62-1.5l-.4-.23-4.58 1.18 1.22-4.34-.27-.42a10.93 10.93 0 0 1-1.73-5.9c0-6.04 5.06-10.95 11.38-10.95s11.38 4.91 11.38 10.95-5.06 10.96-11.38 10.96Zm6.36-8.22c-.35-.17-2.08-1.02-2.4-1.14-.32-.12-.55-.17-.78.17-.23.35-.9 1.14-1.1 1.37-.2.23-.4.26-.75.09-.35-.17-1.47-.53-2.8-1.69-1.04-.9-1.74-2.01-1.94-2.36-.2-.35-.02-.54.15-.71.15-.15.35-.4.52-.6.17-.2.23-.35.35-.57.12-.23.06-.43-.03-.6-.09-.17-.78-1.83-1.07-2.5-.28-.66-.56-.57-.78-.58h-.67c-.23 0-.6.09-.92.43-.32.35-1.21 1.17-1.21 2.86s1.24 3.33 1.42 3.56c.17.23 2.45 3.85 5.94 5.4.83.36 1.48.58 1.99.75.84.26 1.61.22 2.22.13.68-.1 2.08-.84 2.37-1.65.29-.81.29-1.5.2-1.65-.09-.15-.32-.24-.67-.41Z" />
            </svg>
            Hacer pedido ahora
          </a>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold mb-6">Preguntas frecuentes</h2>
          <dl className="flex flex-col gap-6">
            {[
              {
                q: "¿Cuál es el pedido mínimo?",
                a: "No tenemos un mínimo fijo. Somos semi-mayoristas: vendemos en cantidades un poco más grandes que el supermercado (por ejemplo, 2 kg de pechugas o una docena de huevos), pero sin obligarte a comprar cajones enteros.",
              },
              {
                q: "¿En qué zonas entregan?",
                a: "Entregamos en Zona Norte del Gran Buenos Aires. Escribinos con tu localidad y te confirmamos si llegamos.",
              },
              {
                q: "¿Con qué frecuencia puedo pedir?",
                a: "Podés pedir semanal, quincenal o cuando lo necesités. Muchos clientes organizan su pedido cada semana para tener siempre producto fresco.",
              },
              {
                q: "¿Cómo sé si el producto es fresco?",
                a: "Trabajamos con pollo refrigerado El Fortín y huevos frescos. Mantenemos cadena de frío en todo el recorrido. La calidad es consistente pedido a pedido.",
              },
              {
                q: "¿Qué formas de pago aceptan?",
                a: "Efectivo y transferencia bancaria.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <dt className="font-bold text-gray-900 mb-1">{q}</dt>
                <dd className="text-gray-600 text-sm leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
