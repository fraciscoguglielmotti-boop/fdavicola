import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "FD Avícola | Pollo y Huevos Semi-Mayorista · Zona Norte GBA",
  description:
    "Comprá pollo fresco (pechugas, entero) y huevos a precio semi-mayorista en Zona Norte. Ideal para familias y personas fitness. Pedido por WhatsApp.",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://fdavicola.com",
    siteName: "FD Avícola",
    title: "FD Avícola | Pollo y Huevos Semi-Mayorista · Zona Norte",
    description:
      "Comprá pollo fresco y huevos en cantidad, a precio conveniente. Zona Norte GBA. Pedido rápido por WhatsApp.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col antialiased bg-white text-gray-900 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}

