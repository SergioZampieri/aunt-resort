import Image from "next/image";
import { Anchor, Box, Grid, GridCol, Group, Stack, Text } from "@mantine/core";
import { IconClock, IconMail, IconMapPin } from "@tabler/icons-react";
import { PageHeader } from "../components/PageHeader";
import { MapEmbed } from "../components/MapEmbed";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { Reveal } from "../components/Reveal";
import { Section, SectionHeading } from "../components/Section";
import { siteInfo } from "../data/site";

export const metadata = {
  title: "Contacto y ubicación | Mirador de Animas",
  description: `Escribinos por WhatsApp o email. ${siteInfo.address}. ${siteInfo.addressZone}.`,
};

function ContactRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Group gap="md" wrap="nowrap" align="flex-start">
      <Text c="lake.8" style={{ lineHeight: 0, marginTop: 4 }}>
        {icon}
      </Text>
      <Box>{children}</Box>
    </Group>
  );
}

export default function ContactosPage() {
  return (
    <>
      <PageHeader
        title="Contacto y ubicación"
        eyebrow="Hablemos"
        image="/images/sections/contactos.jpg"
        imageAlt="Recepción del complejo Mirador de Animas"
        subtitle="Respondemos por WhatsApp todos los días. Contanos las fechas y cuántos son."
      />

      <Section tone="paper">
        <Grid gap={{ base: 40, md: 72 }}>
          <GridCol span={{ base: 12, md: 5 }}>
            <Stack gap="xl">
              <SectionHeading align="left" eyebrow="Escribinos" title="Estamos a un mensaje" />

              <WhatsAppButton label={`WhatsApp ${siteInfo.phoneDisplay}`} size="lg" />

              <Stack gap="lg">
                <ContactRow icon={<IconMail size={21} />}>
                  <Anchor href={`mailto:${siteInfo.email}`} c="lake.8" fw={500}>
                    {siteInfo.email}
                  </Anchor>
                </ContactRow>

                <ContactRow icon={<IconClock size={21} />}>
                  <Text fz="sm">Check-in: {siteInfo.checkIn}</Text>
                  <Text fz="sm">Check-out: {siteInfo.checkOut}</Text>
                </ContactRow>
              </Stack>

              <Reveal delay={120}>
                <Box
                  className="arch"
                  style={{ position: "relative", height: 280, boxShadow: "var(--mantine-shadow-md)" }}
                >
                  <Image
                    src="/images/contacto/contacto.jpg"
                    alt="Entrada del complejo Mirador de Animas"
                    fill
                    loading="lazy"
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </Box>
              </Reveal>
            </Stack>
          </GridCol>

          <GridCol span={{ base: 12, md: 7 }}>
            <Stack gap="xl">
              <SectionHeading align="left" eyebrow="Cómo llegar" title="Dónde estamos" />

              <Stack gap="lg">
                <ContactRow icon={<IconMapPin size={21} />}>
                  <Text fz="lg" fw={600}>
                    {siteInfo.address}
                  </Text>
                  <Text c="dimmed" lh={1.7}>
                    {siteInfo.addressZone}
                  </Text>
                </ContactRow>

              </Stack>

              <Reveal delay={160}>
                <MapEmbed height={460} />
              </Reveal>
            </Stack>
          </GridCol>
        </Grid>
      </Section>
    </>
  );
}
