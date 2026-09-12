import Image from "next/image";
import { Box, Text, Title } from "@mantine/core";
import { PageHeader } from "../components/PageHeader";
import { CuratedMosaic } from "../components/CuratedMosaic";
import { PhotoGrid } from "../components/PhotoGrid";
import { ServicesList } from "../components/ServicesList";
import { Reveal } from "../components/Reveal";
import { Section, SectionHeading } from "../components/Section";
import { exteriorImages, parkMosaic } from "../data/site";

export const metadata = {
  title: "Exteriores y Piscina | Mirador de Animas",
  description: "Amplio parque, piscina con cerco perimetral y espacios al aire libre en Mirador de Animas.",
};

const curated = new Set(parkMosaic.map((tile) => tile.src));
const moreImages = exteriorImages.filter((src) => !curated.has(src));

/** "Predio": the park in six frames, the breakfast arch, the services. */
export default function ExterioresPiscinaPage() {
  return (
    <>
      <PageHeader
        title="Todo el predio"
        eyebrow="Parque y piscina"
        image="/images/sections/exteriores-piscina.jpg"
        imageAlt="Piscina con cerco perimetral y reposeras"
        height={410}
      />

      <Section>
        <Text fz={15} lh={1.7} c="pine.1" maw={620} style={{ textWrap: "pretty" }}>
          Piscina con cerco perimetral, amplio parque arbolado, juegos para niños y parrilla
          individual en cada cabaña.
        </Text>

        <Box pt={20}>
          <CuratedMosaic tiles={parkMosaic} label="Parque y piscina de Mirador de Animas" />
        </Box>

        <Reveal>
          <Box
            className="arch photo-grade"
            mt={22}
            style={{ position: "relative", height: "clamp(250px, 36vw, 420px)", ["--photo-brightness" as string]: 0.96 }}
          >
            <Image
              src="/images/sections/servicios.jpg"
              alt="Mesa servida con el desayuno"
              fill
              loading="lazy"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 62em) 100vw, 1200px"
            />
          </Box>
        </Reveal>

        <Title order={2} className="display" fz={{ base: 30, md: 46 }} lh={1.05} pt={26} pb={15}>
          Servicios
        </Title>
        <Box maw={720}>
          <ServicesList size="sm" />
        </Box>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Más fotos"
          title="El parque, de cerca"
          lead="El resto del parque, la piscina y los espacios comunes. Tocá cualquier foto para abrirla en pantalla completa."
        />
        <Box mt={{ base: 26, md: 40 }}>
          <PhotoGrid images={moreImages} label="Exteriores y piscina de Mirador de Animas" />
        </Box>
      </Section>
    </>
  );
}
