export type Cabin = {
  slug: string;
  id: string;
  number: number;
  name: string;
  shortDescription: string;
  capacity: string;
  /**
   * Max occupancy for the dates+guests finder. TODO: confirm real per-cabin
   * maximum with the owners — inferred from "5 a 8 personas" copy (8 for
   * cabañas 1-5) and Cabaña Seis's single photo / "5 personas" copy (5).
   */
  max: number;
  /**
   * Position within the park, shown on result cards. TODO: confirm with the
   * owners — an assumption from the design, not in any scraped source.
   */
  parkNote: string;
  imageCount: number;
  imageFolder: string;
  sectionImage: string;
  amenities: string[];
  /**
   * Curated filmstrip order (1-indexed image numbers) for the cabin detail
   * gallery — a walk through the unit: galería → living → cocina-comedor →
   * habitación matrimonial → segunda habitación → terraza con vista. Falls
   * back to natural image order when absent. Do not shuffle it.
   */
  filmstripOrder?: number[];
};

const baseAmenities = [
  "Cocina totalmente equipada",
  "Baño totalmente equipado",
  "Wi-Fi en la cabaña",
  "Blanquería y ropa de cama",
  "Calefacción",
  "Aire acondicionado",
  "Parrilla individual",
  "Estacionamiento",
];

export const cabins: Cabin[] = [
  {
    slug: "cabana-uno",
    id: "uno",
    number: 1,
    name: "Cabaña Uno",
    shortDescription:
      "Planta baja con cocina, comedor y living. Planta alta con dos habitaciones, terraza y baño.",
    capacity: "5 a 8 personas",
    max: 8,
    parkNote: "Primera del ingreso, a dos pasos del estacionamiento",
    imageCount: 26,
    imageFolder: "cabana-1",
    sectionImage: "/images/sections/cabana-01.jpg",
    amenities: [...baseAmenities, "TV por cable"],
    filmstripOrder: [2, 4, 6, 16, 19, 12],
  },
  {
    slug: "cabana-dos",
    id: "dos",
    number: 2,
    name: "Cabaña Dos",
    shortDescription:
      "Planta baja con cocina, comedor y living. Planta alta con dos habitaciones, terraza y baño.",
    capacity: "5 a 8 personas",
    max: 8,
    parkNote: "Frente a la piscina",
    imageCount: 25,
    imageFolder: "cabana-2",
    sectionImage: "/images/sections/cabana-02.jpg",
    amenities: [...baseAmenities, "TV por cable"],
  },
  {
    slug: "cabana-tres",
    id: "tres",
    number: 3,
    name: "Cabaña Tres",
    shortDescription:
      "Planta baja con cocina, comedor y living. Planta alta con dos habitaciones, terraza y baño.",
    capacity: "5 a 8 personas",
    max: 8,
    parkNote: "La más alta, con vista a la sierra",
    imageCount: 24,
    imageFolder: "cabana-3",
    sectionImage: "/images/sections/cabana-03.jpg",
    amenities: [...baseAmenities, "TV por cable"],
  },
  {
    slug: "cabana-cuatro",
    id: "cuatro",
    number: 4,
    name: "Cabaña Cuatro",
    shortDescription:
      "Planta baja con cocina, comedor y living. Planta alta con dos habitaciones, terraza y baño.",
    capacity: "5 a 8 personas",
    max: 8,
    parkNote: "Al lado de los juegos para niños",
    imageCount: 23,
    imageFolder: "cabana-4",
    sectionImage: "/images/sections/cabana-04.jpg",
    amenities: [...baseAmenities, "TV por cable"],
  },
  {
    slug: "cabana-cinco",
    id: "cinco",
    number: 5,
    name: "Cabaña Cinco",
    shortDescription:
      "Planta baja con cocina, comedor y living. Planta alta con dos habitaciones, terraza y baño.",
    capacity: "5 a 8 personas",
    max: 8,
    parkNote: "Al fondo del parque, la más tranquila",
    imageCount: 24,
    imageFolder: "cabana-5",
    sectionImage: "/images/sections/cabana-05.jpg",
    amenities: [...baseAmenities, "TV por cable"],
  },
  {
    slug: "cabana-seis",
    id: "seis",
    number: 6,
    name: "Cabaña Seis",
    shortDescription:
      "Planta baja con cocina, comedor y living. Planta alta con dos habitaciones, terraza y baño.",
    capacity: "5 a 8 personas",
    max: 5,
    parkNote: "Entre los árboles, para cinco",
    imageCount: 1,
    imageFolder: "cabana-6",
    sectionImage: "/images/sections/cabana-06.jpg",
    amenities: [...baseAmenities, "TV DirecTV"],
  },
];

export function getCabinBySlug(slug: string): Cabin | undefined {
  return cabins.find((cabin) => cabin.slug === slug);
}

export function getCabinImages(cabin: Cabin): string[] {
  return Array.from(
    { length: cabin.imageCount },
    (_, i) => `/images/${cabin.imageFolder}/img-${String(i + 1).padStart(2, "0")}.jpg`,
  );
}

/**
 * The gallery filmstrip, in narrative order (a walk through the unit) when
 * curated, falling back to natural image order otherwise.
 */
export function getFilmstripImages(cabin: Cabin): string[] {
  const order = cabin.filmstripOrder ?? Array.from({ length: cabin.imageCount }, (_, i) => i + 1);
  return order.map((n) => `/images/${cabin.imageFolder}/img-${String(n).padStart(2, "0")}.jpg`);
}
