import { Box, Group, Text } from "@mantine/core";
import { PageHeader } from "../components/PageHeader";
import { PromoCards } from "../components/PromoCards";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { LinkButton } from "../components/NavLinks";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";

export const metadata = {
  title: "Promociones | Mirador de Animas",
  description: "Consultá por promociones de temporada y beneficios para estadías prolongadas.",
};

export default function PromocionesPage() {
  return (
    <>
      <PageHeader
        title="Promociones"
        eyebrow="Beneficios"
        image="/images/sections/promociones.jpg"
        imageAlt="Galería exterior de una cabaña al atardecer"
        height={330}
        compact
      />

      <Section>
        <Text fz={15} lh={1.7} c="pine.1" maw={620} style={{ textWrap: "pretty" }}>
          Contanos cuántos son y qué fechas mirás, y te pasamos la tarifa que te corresponda.
        </Text>

        <Box pt={22}>
          <PromoCards />
        </Box>

        <Reveal delay={220}>
          <Group gap={10} pt={18}>
            <LinkButton href="/" className="pill" color="lake" fullWidth hiddenFrom="sm">
              Ver fechas disponibles
            </LinkButton>
            <LinkButton href="/" className="pill" color="lake" px={30} visibleFrom="sm">
              Ver fechas disponibles
            </LinkButton>
            <Box visibleFrom="sm">
              <WhatsAppButton
                message="Hola, quisiera consultar por promociones y disponibilidad."
                label="Consultar promociones"
                variant="outline"
                color="oat.1"
                size="lg"
              />
            </Box>
          </Group>
        </Reveal>
      </Section>
    </>
  );
}
