import { Box, Grid, GridCol, List, ListItem, Stack, ThemeIcon } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import Image from "next/image";
import { PageHeader } from "../components/PageHeader";
import { AmenityHighlights } from "../components/AmenityHighlights";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { Reveal } from "../components/Reveal";
import { Section, SectionHeading } from "../components/Section";
import { services } from "../data/site";

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
      />

      <Section tone="paper">
        <AmenityHighlights />
      </Section>


      <Section tone="deep">
        <Grid gap={{ base: 40, md: 64 }} style={{ alignItems: "center" }}>
          <GridCol span={{ base: 12, md: 6 }}>
            <Reveal>
              <Box
                className="arch"
                style={{
                  position: "relative",
                  height: "clamp(320px, 44vw, 500px)",
                  boxShadow: "var(--mantine-shadow-lg)",
                }}
              >
                <Image
                  src="/images/sections/servicios.jpg"
                  alt="Desayuno servido en la galería de una cabaña"
                  fill
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Box>
            </Reveal>
          </GridCol>

          <GridCol span={{ base: 12, md: 6 }}>
            <Stack gap="xl">
              <SectionHeading
                align="left"
                eyebrow="La lista completa"
                title="Todo lo que necesitás"
              />
              <Reveal delay={100}>
                <List
                  spacing="sm"
                  lh={1.6}
                  icon={
                    <ThemeIcon color="lake" variant="light" size={24} radius="xl">
                      <IconCheck size={14} stroke={2.2} />
                    </ThemeIcon>
                  }
                >
                  {services.map((service) => (
                    <ListItem key={service}>{service}</ListItem>
                  ))}
                </List>
              </Reveal>
              <Reveal delay={160}>
                <WhatsAppButton />
              </Reveal>
            </Stack>
          </GridCol>
        </Grid>
      </Section>
    </>
  );
}
