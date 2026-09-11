"use client";

import Image from "next/image";
import { useState } from "react";
import { Box, Button, Group, Overlay, Stack, Text } from "@mantine/core";
import { IconBrandGoogleMaps, IconMapPin } from "@tabler/icons-react";
import { siteInfo } from "../data/site";

/**
 * Google Maps embed.
 *
 * Note the URL form: the legacy `maps.google.com/maps?...&output=embed`
 * answers with a 301 carrying `X-Frame-Options: SAMEORIGIN`, which browsers
 * refuse to render in a frame. `/maps/embed?pb=` — the form Google's own
 * "Compartir → Insertar un mapa" produces — returns 200 and frames fine, with
 * no API key. `!1m3!2m1!1s<query>!6i<zoom>` is the place-by-query shape.
 */
const ZOOM = 16;

const embedSrc = `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${encodeURIComponent(
  siteInfo.mapEmbedQuery,
)}!6i${ZOOM}`;

const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  siteInfo.mapEmbedQuery,
)}`;

/** Loads only when the visitor asks, so the page makes no third-party request on its own. */
export function MapEmbed({ height = 420 }: { height?: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Stack gap="sm">
      <Box
        style={{
          position: "relative",
          height,
          borderRadius: "var(--mantine-radius-md)",
          overflow: "hidden",
          border: "1px solid var(--hairline)",
        }}
      >
        {loaded ? (
          <iframe
            src={embedSrc}
            width="100%"
            height={height}
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            title={`Mapa de ubicación de ${siteInfo.name}`}
          />
        ) : (
          <>
            <Image
              src="/images/sections/ubicacion.jpg"
              alt=""
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            <Overlay color="#0c1f1a" backgroundOpacity={0.62} />
            <Stack
              gap="md"
              align="center"
              justify="center"
              ta="center"
              p="lg"
              style={{ position: "absolute", inset: 0 }}
            >
              <Text c="white" fw={600} ff="var(--font-abhaya-libre)" fz="var(--h3)">
                {siteInfo.address}
              </Text>
              <Text c="oat.3" fz="sm" maw={380} lh={1.6}>
                El mapa se carga desde Google sólo si lo pedís.
              </Text>
              <Button
                color="lake"
                radius="xl"
                leftSection={<IconMapPin size={18} />}
                onClick={() => setLoaded(true)}
              >
                Cargar el mapa
              </Button>
            </Stack>
          </>
        )}
      </Box>

      <Group justify="space-between" gap="xs">
        <Text fz="xs" c="dimmed">
          {siteInfo.gpsCoordinates}
        </Text>
        <Button
          component="a"
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="subtle"
          color="lake"
          size="compact-sm"
          leftSection={<IconBrandGoogleMaps size={15} />}
        >
          Cómo llegar
        </Button>
      </Group>
    </Stack>
  );
}
