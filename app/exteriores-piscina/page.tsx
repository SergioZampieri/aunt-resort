import { PageHeader } from "../components/PageHeader";
import { PhotoGrid } from "../components/PhotoGrid";
import { Section, SectionHeading } from "../components/Section";
import { exteriorImages } from "../data/site";

export const metadata = {
  title: "Exteriores y Piscina | Mirador de Animas",
  description: "Amplio parque, piscina con cerco perimetral y espacios al aire libre en Mirador de Animas.",
};

export default function ExterioresPiscinaPage() {
  return (
    <>
      <PageHeader
        title="Exteriores y Piscina"
        eyebrow="Al aire libre"
        image="/images/sections/exteriores-piscina.jpg"
        imageAlt="Piscina y parque del complejo Mirador de Animas"
        subtitle="Parque abierto, juegos para los chicos y una piscina con cerco perimetral."
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="Galería"
          title="El parque, de cerca"
          lead="Una selección del parque, la piscina y los espacios comunes. Tocá cualquier foto para abrirla en pantalla completa."
        />
        <div style={{ marginTop: "clamp(2rem, 1rem + 3vw, 3.5rem)" }}>
          <PhotoGrid images={exteriorImages} label="Exteriores y piscina de Mirador de Animas" />
        </div>
      </Section>
    </>
  );
}
