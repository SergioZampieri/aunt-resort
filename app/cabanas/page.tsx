import { PageHeader } from "../components/PageHeader";
import { CabinFinder } from "../components/CabinFinder";
import { Section } from "../components/Section";
import { cabins } from "../data/cabins";

export const metadata = {
  title: "Cabañas | Mirador de Animas",
  description: "Conocé nuestras 6 cabañas equipadas para 5 a 8 personas en Tandil.",
};

export default function CabanasPage() {
  return (
    <>
      <PageHeader
        title="Seis cabañas, un mismo parque"
        eyebrow="Las cabañas"
        image="/images/sections/cabana-01.jpg"
        imageAlt="Frente de una de las cabañas del complejo"
        subtitle="Todas independientes, para 5 a 8 personas. Elegí tus fechas y mirá cuáles quedan libres."
      />
      <Section tone="paper">
        <CabinFinder cabins={cabins} />
      </Section>
    </>
  );
}
