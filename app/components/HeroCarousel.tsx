"use client";

import Image from "next/image";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import { useEffect, useRef, useState } from "react";
import { Box, Container, Group, Stack, Text, Title } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import { IconArrowDown, IconMapPin } from "@tabler/icons-react";
import type { HeroBanner } from "../data/site";
import { LinkButton } from "./NavLinks";
import { WhatsAppButton } from "./WhatsAppButton";

type HeroCarouselProps = {
  banners: HeroBanner[];
};

const AUTOPLAY_MS = 7000;

export function HeroCarousel({ banners }: HeroCarouselProps) {
  const emblaRef = useRef<EmblaCarouselType | null>(null);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || paused) {
      return;
    }

    const interval = setInterval(() => {
      if (!document.hidden) {
        emblaRef.current?.scrollNext();
      }
    }, AUTOPLAY_MS);

    return () => clearInterval(interval);
  }, [reducedMotion, paused]);

  return (
    <Box
      className="grain"
      style={{ position: "relative", backgroundColor: "var(--pine-night)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Carousel
        withIndicators
        withControls={false}
        height="clamp(540px, 86vh, 820px)"
        emblaOptions={{ loop: true, duration: 45 }}
        getEmblaApi={(embla) => {
          emblaRef.current = embla;
          embla.on("select", () => setActive(embla.selectedScrollSnap()));
        }}
      >
        {banners.map((banner, index) => (
          <CarouselSlide key={banner.src}>
            <Box
              // The slow zoom restarts on whichever slide is showing.
              className={index === active ? "kenburns" : undefined}
              style={{ position: "relative", height: "100%", overflow: "hidden" }}
            >
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                style={{ objectFit: "cover" }}
                sizes="100vw"
              />
            </Box>
          </CarouselSlide>
        ))}
      </Carousel>

      <Box
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(178deg, rgba(11,28,23,0.72) 0%, rgba(11,28,23,0.22) 30%, rgba(11,28,23,0.74) 72%, rgba(11,28,23,0.96) 100%)",
          display: "flex",
          alignItems: "flex-end",
          pointerEvents: "none",
        }}
      >
        <Container size="lg" w="100%" pb={{ base: 72, sm: 96 }}>
          <Stack gap="lg" maw={760} style={{ pointerEvents: "auto" }}>
            <Group gap={8} c="lantern.3">
              <IconMapPin size={16} />
              <Text className="eyebrow">Tandil · Buenos Aires</Text>
            </Group>

            <Title order={1} c="white" style={{ textWrap: "balance" }}>
              El aire de la sierra, a tu ritmo.
            </Title>

            <Text c="oat.2" fz={{ base: "md", sm: "lg" }} lh={1.7} maw={500}>
              Seis cabañas de piedra y madera entre el parque y la piscina, a minutos del
              centro. Sin apuro, sin ruido.
            </Text>

            <Group gap="sm" mt="sm">
              <LinkButton
                href="/cabanas"
                size="md"
                radius="xl"
                color="lake"
              >
                Ver fechas libres
              </LinkButton>
              <WhatsAppButton variant="white" label="Escribinos" />
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* Scroll cue */}
      <Box
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          bottom: 22,
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.65)",
          pointerEvents: "none",
        }}
      >
        <IconArrowDown size={20} />
      </Box>
    </Box>
  );
}
