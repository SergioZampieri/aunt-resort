import { Group } from "@mantine/core";
import { PageHeader } from "../components/PageHeader";
import { AmenityHighlights } from "../components/AmenityHighlights";
import { ServicesBand } from "../components/ServicesList";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";

export const metadata = {
  title: "Servicios | Mirador de Animas",
  description: "Desayuno, Wi-Fi, TV por cable, parrilla individual y todos los servicios de Mirador de Animas.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        title="Servicios"
        eyebrow="Todo incluido"
        image="/images/sections/servicios.jpg"
        imageAlt="Mesa servida con el desayuno de Mirador de Animas"
        subtitle="Desayuno casero, Wi-Fi en todo el predio, parrilla propia y piscina. Sin extras al final."
        height={330}
        compact
      />

      <Section>
        <AmenityHighlights />
      </Section>

      <Section>
        <ServicesBand />
        <Reveal delay={160}>
          <Group pt={32}>
            <WhatsAppButton size="lg" />
          </Group>
        </Reveal>
      </Section>
    </>
  );
}
