import { Product } from "../components/ProductCard";

export const products: Product[] = [
  {
    id: "pechugas-2kg",
    name: "Pechugas de pollo",
    description:
      "Pechugas frescas, sin hueso y sin piel. Alta proteína, ideal para meal prep, dietas fitness y familias que cocinan en cantidad.",
    image: "/producto-2.jpg",
    badge: "Fitness",
    options: [
      { label: "2 kg", unit: "2kg" },
      { label: "4 kg", unit: "4kg" },
      { label: "6 kg", unit: "6kg" },
    ],
    waText:
      "Hola FD Avícola, quiero consultar precio de pechugas de pollo. Zona Norte. ¿Qué presentaciones tienen disponibles hoy?",
  },
  {
    id: "pollo-entero",
    name: "Pollo entero El Fortín",
    description:
      "Pollo entero refrigerado El Fortín. Ideal para familias que buscan ahorro comprando en cantidad. Cadena de frío garantizada.",
    image: "/producto-2.jpg",
    options: [
      { label: "Unidad", unit: "1u" },
      { label: "Pack 2", unit: "2u" },
      { label: "Pack 4", unit: "4u" },
    ],
    waText:
      "Hola FD Avícola, quiero consultar precio de pollo entero El Fortín. Zona Norte. ¿Cuánto sale por unidad y por pack?",
  },
  {
    id: "huevos-docena",
    name: "Huevos frescos",
    description:
      "Huevos frescos de primera calidad. Vendemos por docena, media bandeja o bandeja completa. Perfectos para familias y personas fitness.",
    image: "/producto-1.jpg",
    badge: "Más pedido",
    options: [
      { label: "Docena (12)", unit: "12u" },
      { label: "Media bandeja (15)", unit: "15u" },
      { label: "Bandeja (30)", unit: "30u" },
    ],
    waText:
      "Hola FD Avícola, quiero consultar precio de huevos. Zona Norte. ¿Tienen por docena y por bandeja de 30?",
  },
  {
    id: "pack-fitness",
    name: "Pack Fitness",
    description:
      "La combinación perfecta para quien entrena: pechugas + huevos. Ahorrás comprando en combo y organizás tu semana de comidas.",
    image: "/producto-2.jpg",
    badge: "Combo",
    options: [
      { label: "4kg pech + bandeja 30", unit: "combo-m" },
      { label: "6kg pech + 2 bandejas", unit: "combo-l" },
    ],
    waText:
      "Hola FD Avícola, me interesa el Pack Fitness (pechugas + huevos). Zona Norte. ¿Qué precios tienen para esta semana?",
  },
  {
    id: "pack-familia",
    name: "Pack Familia",
    description:
      "Pollo entero + huevos para abastecer a toda la familia. Comprás para la semana o quincena y salís ganando en precio.",
    image: "/producto-1.jpg",
    badge: "Combo",
    options: [
      { label: "2 pollos + docena", unit: "combo-fam-s" },
      { label: "4 pollos + bandeja 30", unit: "combo-fam-l" },
    ],
    waText:
      "Hola FD Avícola, me interesa el Pack Familia (pollo entero + huevos). Zona Norte. ¿Qué precios tienen esta semana?",
  },
  {
    id: "menudencias",
    name: "Menudencias y cortes",
    description:
      "Mollejas, hígados, alitas y más. Productos frescos para completar tu pedido. Consultanos disponibilidad semanal.",
    image: "/producto-2.jpg",
    options: [
      { label: "Alitas", unit: "alas" },
      { label: "Mollejas", unit: "mollejas" },
      { label: "Hígados", unit: "higados" },
    ],
    waText:
      "Hola FD Avícola, quiero consultar disponibilidad y precio de menudencias/cortes (alitas, mollejas, hígados). Zona Norte.",
  },
];

export const featuredProducts = products.filter((p) =>
  ["pechugas-2kg", "huevos-docena", "pack-fitness"].includes(p.id)
);
