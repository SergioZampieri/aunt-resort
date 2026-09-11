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

export const heroBanners: HeroBanner[] = [
  { src: "/images/hero/banner-01.jpg", alt: "Cabañas de Mirador de Animas rodeadas de parque al pie de las sierras de Tandil" },
  { src: "/images/hero/banner-02.jpg", alt: "Vista del complejo con las sierras de Tandil de fondo" },
  { src: "/images/hero/banner-03.jpg", alt: "Piscina del complejo con cerco perimetral y reposeras" },
  { src: "/images/hero/banner-04.jpg", alt: "Galería de una cabaña con parrilla individual y mesa exterior" },
  { src: "/images/hero/banner-05.jpg", alt: "Amplio parque arbolado del complejo al atardecer" },
  { src: "/images/hero/banner-06.jpg", alt: "Frente de las cabañas en piedra y madera con luces cálidas" },
];

export const homeTeasers = [
  {
    title: "Las cabañas",
    image: "/images/home/teaser-cabanas-1-2.jpg",
    href: "/cabanas",
    alt: "Interior de una cabaña con living y escalera a la planta alta",
  },
  {
    title: "Parque y piscina",
    image: "/images/home/teaser-piscina.jpeg",
    href: "/exteriores-piscina",
    alt: "Piscina con cerco perimetral rodeada de césped",
  },
  {
    title: "Servicios",
    image: "/images/home/teaser-promociones.jpg",
    href: "/servicios",
    alt: "Galería exterior de una cabaña preparada para el desayuno",
  },
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

export const exteriorImages = [
  ...Array.from(
    { length: 34 },
    (_, i) => `/images/exteriores/img-${String(i + 1).padStart(2, "0")}.jpg`,
  ),
  "/images/exteriores/piscina02.jpeg",
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
