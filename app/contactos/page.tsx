import { Anchor, Box, Divider, Grid, GridCol, Group, Stack, Text } from "@mantine/core";
import { PageHeader } from "../components/PageHeader";
import { MapButton, MapEmbed } from "../components/MapEmbed";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { siteInfo } from "../data/site";

export const metadata = {
  title: "Contacto y ubicación | Mirador de Animas",
  description: `Escribinos por WhatsApp o email. ${siteInfo.address}. ${siteInfo.addressZone}.`,
};

const facts: { label: string; value: React.ReactNode }[] = [
  { label: "Dirección", value: siteInfo.address },
  { label: "Zona", value: "El Paraíso" },
  { label: "Check-in", value: siteInfo.checkIn.toLowerCase() },
  { label: "Check-out", value: siteInfo.checkOut.toLowerCase() },
  { label: "Mascotas", value: siteInfo.petsAllowed ? "Se admiten" : "No se admiten" },
  {
    label: "Email",
    value: (
      <Anchor href={`mailto:${siteInfo.email}`} c="oat.0" fz={13.5} fw={500} underline="hover">
        {siteInfo.email}
      </Anchor>
    ),
  },
];

/** Contact and location in one place: the gate sign, the facts, two buttons, the map on request. */
export default function ContactosPage() {
  return (
    <>
      <PageHeader
        title="Cómo llegar"
        eyebrow={siteInfo.address.split(",")[0]}
        image="/images/exteriores/img-03.jpg"
        imageAlt="Cartel de madera de Mirador de Ánimas en el ingreso al complejo"
        objectPosition="50% 58%"
        height={294}
        compact
      />

      <Section>
        <Grid gap={{ base: 0, md: 64 }}>
          <GridCol span={{ base: 12, md: 5 }}>
            <Stack gap={0}>
              <Stack className="surface" gap={14} p={18}>
                {facts.map((fact) => (
                  <Group key={fact.label} justify="space-between" align="baseline" gap={14} wrap="nowrap">
                    <Text fz={13} lh={1.4} c="pine.2" style={{ flex: "none" }}>
                      {fact.label}
                    </Text>
                    <Text fz={13.5} fw={500} lh={1.5} ta="right" c="paper" component="div">
                      {fact.value}
                    </Text>
                  </Group>
                ))}
              </Stack>

              <Stack gap={9} pt={14}>
                <WhatsAppButton label={`WhatsApp ${siteInfo.phoneDisplay}`} size="lg" fullWidth />
                <MapButton fullWidth />
              </Stack>

              <Text fz={12.5} lh={1.65} c="pine.2" pt={16} px={2} style={{ textWrap: "pretty" }}>
                {siteInfo.addressZone}. {siteInfo.gpsCoordinates}.
              </Text>
            </Stack>
          </GridCol>

          <GridCol span={{ base: 12, md: 7 }}>
            <Divider hiddenFrom="md" my={28} color="var(--hairline-light)" />
            <Reveal delay={120}>
              <Box>
                <Text className="eyebrow" c="pine.3" pb={14}>
                  En el mapa
                </Text>
                <MapEmbed height={420} />
              </Box>
            </Reveal>
          </GridCol>
        </Grid>
      </Section>
    </>
  );
}
