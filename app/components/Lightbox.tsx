"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import { ActionIcon, Box, Group, Modal, Text, UnstyledButton } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

type LightboxProps = {
  images: string[];
  label: string;
  /** Index to open at, or null when closed. */
  index: number | null;
  onClose: () => void;
};

/**
 * Full-screen viewer: drag or swipe between photos, arrow keys, and a
 * thumbnail rail that keeps the current shot in view.
 */
export function Lightbox({ images, label, index, onClose }: LightboxProps) {
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const [current, setCurrent] = useState(index ?? 0);
  const railRef = useRef<HTMLDivElement>(null);

  const opened = index !== null;

  useEffect(() => {
    if (index !== null) {
      setCurrent(index);
    }
  }, [index]);

  // Keep the active thumbnail scrolled into view as the slide changes.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !opened) {
      return;
    }
    const active = rail.querySelector<HTMLElement>('[data-active="true"]');
    active?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [current, opened]);

  const handleKey = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        embla?.scrollNext();
      }
      if (event.key === "ArrowLeft") {
        embla?.scrollPrev();
      }
    },
    [embla],
  );

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      fullScreen
      withCloseButton={false}
      padding={0}
      transitionProps={{ transition: "fade", duration: 220 }}
      styles={{
        body: { height: "100%", padding: 0 },
        content: { backgroundColor: "var(--pine-night)" },
      }}
      aria-label={`Galería: ${label}`}
      onKeyDown={handleKey}
    >
      <Box
        style={{
          height: "100dvh",
          display: "grid",
          // minmax(0,1fr) so the stage can shrink; a bare 1fr refuses to go
          // below its content and pushes the filmstrip off-screen.
          gridTemplateRows: "auto minmax(0, 1fr) auto",
          gap: 12,
        }}
      >
        <Group justify="space-between" px="lg" pt="md" wrap="nowrap">
          <Text className="eyebrow" c="oat.3">
            {label}
          </Text>
          <Group gap="md" wrap="nowrap">
            <Text c="oat.3" fz="sm" fw={600} style={{ fontVariantNumeric: "tabular-nums" }}>
              {current + 1} / {images.length}
            </Text>
            <ActionIcon
              variant="subtle"
              color="gray"
              size="lg"
              radius="xl"
              onClick={onClose}
              aria-label="Cerrar galería"
            >
              <IconX size={22} />
            </ActionIcon>
          </Group>
        </Group>

        <Box style={{ minHeight: 0, height: "100%", paddingInline: "clamp(8px, 2vw, 32px)" }}>
          {opened ? (
            <Carousel
              height="100%"
              initialSlide={index ?? 0}
              emblaOptions={{ loop: true }}
              getEmblaApi={setEmbla}
              onSlideChange={setCurrent}
              withIndicators={false}
              controlsOffset="xs"
              styles={{
                // The carousel root is height:auto by default, so a
                // percentage height on the viewport would collapse to zero.
                root: { height: "100%" },
                viewport: { height: "100%" },
                container: { height: "100%" },
                slide: { height: "100%" },
                control: {
                  backgroundColor: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  color: "#fff",
                  width: 44,
                  height: 44,
                },
              }}
            >
              {images.map((src, i) => (
                <CarouselSlide key={src}>
                  <Box style={{ position: "relative", height: "100%" }}>
                    <Image
                      src={src}
                      alt={`${label} (foto ${i + 1} de ${images.length})`}
                      fill
                      // Neighbours are fetched eagerly so swiping feels instant.
                      priority={Math.abs(i - current) <= 1}
                      style={{ objectFit: "contain" }}
                      sizes="100vw"
                    />
                  </Box>
                </CarouselSlide>
              ))}
            </Carousel>
          ) : null}
        </Box>

        <Box className="filmstrip" ref={railRef} px="lg" pb="md">
          {images.map((src, i) => (
            <UnstyledButton
              key={src}
              className="filmstripItem"
              data-active={i === current || undefined}
              onClick={() => embla?.scrollTo(i)}
              aria-label={`Ir a la foto ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
            >
              <Image src={src} alt="" fill loading="lazy" style={{ objectFit: "cover" }} sizes="80px" />
            </UnstyledButton>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}
