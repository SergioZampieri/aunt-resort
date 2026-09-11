export type Cabin = {
  slug: string;
  id: string;
  number: number;
  name: string;
  shortDescription: string;
  capacity: string;
  imageCount: number;
  imageFolder: string;
  sectionImage: string;
  amenities: string[];
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
    imageCount: 26,
    imageFolder: "cabana-1",
    sectionImage: "/images/sections/cabana-01.jpg",
    amenities: [...baseAmenities, "TV por cable"],
  },
  {
    slug: "cabana-dos",
    id: "dos",
    number: 2,
    name: "Cabaña Dos",
    shortDescription:
      "Planta baja con cocina, comedor y living. Planta alta con dos habitaciones, terraza y baño.",
    capacity: "5 a 8 personas",
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
