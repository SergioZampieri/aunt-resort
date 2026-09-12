import Image from "next/image";
import { Box, Container, Group, Stack, Text, Title } from "@mantine/core";
import { siteInfo } from "../data/site";
import { MapButton } from "./MapEmbed";
import { WhatsAppButton } from "./WhatsAppButton";

/**
 * "Cómo llegar" as a full-bleed band: the hand-painted gate sign under a
 * left-to-right scrim, so the copy sits on dark. Desktop only — phones have
 * the Contacto tab.
 */
export function ArrivalBand() {
  return (
    <Box style={{ position: "relative", height: 440, overflow: "hidden" }}>
      <Box
        className="photo-grade"
        style={{ position: "absolute", inset: 0, ["--photo-brightness" as string]: 0.9 }}
      >
        <Image
          src="/images/exteriores/img-03.jpg"
          alt="Cartel de madera de Mirador de Ánimas en el ingreso al complejo"
          fill
          loading="lazy"
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "50% 56%" }}
        />
      </Box>
      <Box
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(12,31,26,0.94) 6%, rgba(12,31,26,0.3) 62%)",
        }}
      />
      <Container size="lg" h="100%" style={{ position: "relative", zIndex: 1 }}>
        <Stack justify="center" gap={0} h="100%" maw={560}>
          <Text className="eyebrow" c="lantern.4" pb={16}>
            {siteInfo.address.split(",")[0]}
          </Text>
          <Title order={2} className="display" fz={64} lh={0.98} style={{ letterSpacing: "-0.04em" }}>
            Cómo llegar
          </Title>
          <Text fz={15} lh={1.7} c="pine.1" pt={18} pb={26}>
            Ingresando desde Ruta Nacional 226 y Juan Manuel de Rosas, zona El Paraíso.{" "}
            {siteInfo.gpsCoordinates}.
          </Text>
          <Group gap={10}>
            <WhatsAppButton label={`WhatsApp ${siteInfo.phoneDisplay}`} size="md" />
            <MapButton size="md" />
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
