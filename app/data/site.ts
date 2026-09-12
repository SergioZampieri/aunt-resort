export const siteInfo = {
  name: "Mirador de Animas",
  tagline: "Confort al pie de las sierras",
  description:
    "Complejo de cabañas ubicado en la ciudad de Tandil, a pocos minutos del centro. Comodidad, tranquilidad y relajación al pie de las sierras.",
  address: "Los Aromos 1584, Tandil",
  addressZone: "Zona El Paraíso, ingresando desde Ruta Nacional 226 y Juan Manuel de Rosas",
  gpsCoordinates: `S 37° 19' 59" O 59° 04' 55"`,
  email: "info@miradordeanimas.com.ar",
  whatsapp: "+549-2494313374",
  whatsappNumber: "5492494313374",
  phoneDisplay: "2494-313374",
  checkIn: "14:00 Hs",
  checkOut: "11:00 Hs",
  petsAllowed: false,
  mapEmbedQuery: "Los Aromos 1584, Tandil, Buenos Aires, Argentina",
  url: "https://miradordeanimas.com.ar",
  shareImage: "/images/hero/banner-01.jpg",
  latitude: -37.33306,
  longitude: -59.08194,
};

export type HeroBanner = { src: string; alt: string };

/** Five frames for the desktop carousel. banner-02 is left out on purpose:
 *  an interior shot that does not carry the sierra-view promise. */
export const heroBanners: HeroBanner[] = [
  { src: "/images/hero/banner-01.jpg", alt: "Cabañas de Mirador de Animas rodeadas de parque al pie de las sierras de Tandil" },
  { src: "/images/hero/banner-03.jpg", alt: "Piscina del complejo con cerco perimetral y reposeras" },
  { src: "/images/hero/banner-04.jpg", alt: "Galería de una cabaña con parrilla individual y mesa exterior" },
  { src: "/images/hero/banner-05.jpg", alt: "Amplio parque arbolado del complejo al atardecer" },
  { src: "/images/hero/banner-06.jpg", alt: "Frente de las cabañas en piedra y madera con luces cálidas" },
];

export const services = [
  "Desayuno: leche, medialunas, mermelada, dulce de leche, queso blanco y jugo de naranja natural exprimido",
  "Unidades totalmente equipadas, con comodidad para 5 personas y opción hasta 8",
  "Planta baja: cocina, comedor, living y baño. Planta alta: dos habitaciones con terraza y baño",
  "Cocina y baño totalmente equipados",
  "Juegos para niños",
  "Wi-Fi libre en cada cabaña y en todo el predio",
  "TV por cable",
  "Calefacción y aire acondicionado",
  "Parrilla individual por cabaña",
  "Estacionamiento",
  "Piscina con cerco perimetral",
  "Amplio parque",
];

export const amenityHighlights = [
  {
    title: "Desayuno",
    icon: "breakfast",
    description: "Leche, medialunas, mermelada, dulce de leche, queso blanco y jugo de naranja natural exprimido.",
  },
  {
    title: "TV por cable",
    icon: "tv",
    description: "Cabañas con servicio de entretenimiento de TV por cable.",
  },
  {
    title: "Wi-Fi",
    icon: "wifi",
    description: "Servicio de Wi-Fi libre en todo el predio y en cada cabaña.",
  },
  {
    title: "Ropa de cama",
    icon: "bed",
    description: "Servicio de ropa de cama y de baño de excelente calidad.",
  },
] as const;

/**
 * Piscina02 and five numbered shots lead the set — a curated water → play →
 * shade sequence — followed by the rest of the contact sheet in order.
 */
const curatedFirst = [9, 23, 13, 15, 31];

export const exteriorImages = [
  "/images/exteriores/piscina02.jpeg",
  ...curatedFirst.map((n) => `/images/exteriores/img-${String(n).padStart(2, "0")}.jpg`),
  ...Array.from({ length: 34 }, (_, i) => i + 1)
    .filter((n) => !curatedFirst.includes(n))
    .map((n) => `/images/exteriores/img-${String(n).padStart(2, "0")}.jpg`),
];

/** The six-tile park sequence: water → play → shade. Order matters. */
export const parkMosaic = [
  { src: "/images/exteriores/piscina02.jpeg", alt: "Piscina con reposeras de madera bajo el cielo de la tarde" },
  { src: "/images/exteriores/img-09.jpg", alt: "La piscina vista desde arriba, rodeada de césped" },
  { src: "/images/exteriores/img-23.jpg", alt: "El sol entrando entre los árboles del parque" },
  { src: "/images/exteriores/img-13.jpg", alt: "Juegos para niños en el parque" },
  { src: "/images/exteriores/img-15.jpg", alt: "La casita de juegos de los chicos" },
  { src: "/images/exteriores/img-31.jpg", alt: "Deck de madera y hamaca bajo los árboles grandes" },
];

export const promotions = [
  {
    title: "Promoción temporada",
    description: "Consultanos por disponibilidad y tarifas especiales para tu próxima estadía en Mirador de Animas.",
  },
  {
    title: "Estadías prolongadas",
    description: "Beneficios especiales para reservas de varios días. Escribinos por WhatsApp para más información.",
  },
];
