"use client";

import Image from "next/image";
import { useState } from "react";
import { Box, Button, Center, Group, Text, UnstyledButton } from "@mantine/core";
import { IconArrowsMaximize, IconPhoto } from "@tabler/icons-react";
import { Lightbox } from "./Lightbox";

type PhotoGridProps = {
  images: string[];
  /** Group label; each photo gets it plus its position, so alts stay distinct. */
  label: string;
  /** How many tiles to show before the "see all" step. */
  initial?: number;
};

export function PhotoGrid({ images, label, initial = 12 }: PhotoGridProps) {
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState<number | null>(null);

  const visible = expanded ? images : images.slice(0, initial);
  const remaining = images.length - visible.length;

  return (
    <>
      <Box className="mosaic">
        {visible.map((src, i) => (
          <UnstyledButton
            key={src}
            className="zoomable photo-grade"
            onClick={() => setIndex(i)}
            aria-label={`Ampliar foto ${i + 1} de ${images.length}: ${label}`}
          >
            <Image
              src={src}
              alt={`${label} (foto ${i + 1} de ${images.length})`}
              fill
              loading={i < 6 ? "eager" : "lazy"}
              style={{ objectFit: "cover" }}
              sizes="(max-width: 48em) 50vw, 25vw"
            />
            <Box
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                color: "#fff",
                opacity: 0,
                background: "rgba(12,31,26,0.35)",
                transition: "opacity 350ms var(--ease)",
              }}
              className="tileHint"
            >
              <IconArrowsMaximize size={22} />
            </Box>
          </UnstyledButton>
        ))}
      </Box>

      {remaining > 0 ? (
        <Center mt="xl">
          <Button
            variant="outline"
            color="lake"
            size="md"
            radius="xl"
            onClick={() => setExpanded(true)}
            leftSection={<IconPhoto size={18} />}
          >
            Ver las {images.length} fotos
          </Button>
        </Center>
      ) : null}

      {expanded ? (
        <Group justify="center" mt="lg">
          <Text fz="sm" c="dimmed">
            {images.length} fotos · tocá cualquiera para verla en grande
          </Text>
        </Group>
      ) : null}

      <Lightbox images={images} label={label} index={index} onClose={() => setIndex(null)} />
    </>
  );
}
