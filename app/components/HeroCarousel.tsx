"use client";

import Image from "next/image";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import { useEffect, useRef, useState } from "react";
import { Box, Container, Stack, Text, Title } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import type { HeroBanner } from "../data/site";

type HeroCarouselProps = {
  banners: HeroBanner[];
};

const AUTOPLAY_MS = 7000;

/**
 * The desktop hero: five frames, 7s autoplay, ken-burns on the showing frame.
 * No buttons — the finder bar overlapping its bottom edge is the call to
 * action, so the copy stops 116px short of it and the dots sit 100px up.
 */
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
      style={{ position: "relative", backgroundColor: "var(--pine-night)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Carousel
        withIndicators
        withControls={false}
        height="clamp(560px, 82vh, 660px)"
        emblaOptions={{ loop: true, duration: 45 }}
        classNames={{ indicators: "heroIndicators", indicator: "heroIndicator" }}
        getEmblaApi={(embla) => {
          emblaRef.current = embla;
          embla.on("select", () => setActive(embla.selectedScrollSnap()));
        }}
      >
        {banners.map((banner, index) => (
          <CarouselSlide key={banner.src}>
            <Box
              // The slow zoom restarts on whichever slide is showing.
              className={index === active ? "kenburns photo-grade" : "photo-grade"}
              style={{
                position: "relative",
                height: "100%",
                overflow: "hidden",
                ["--photo-brightness" as string]: 0.92,
              }}
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
        <Container size="lg" w="100%" pb={116}>
          <Stack gap={0} maw={790} style={{ pointerEvents: "auto" }}>
            <Text className="eyebrow" c="lantern.2" pb={20}>
              Tandil · Buenos Aires
            </Text>

            <Title
              order={1}
              c="white"
              fz="clamp(3.4rem, 1.5rem + 4.9vw, 5.375rem)"
              lh={0.95}
              style={{ textWrap: "balance", letterSpacing: "-0.042em" }}
            >
              El aire de la sierra, a tu ritmo.
            </Title>

            <Text c="oat.1" fz={17} lh={1.7} maw={520} pt={22}>
              Seis cabañas de piedra y madera entre el parque y la piscina, a minutos del
              centro. Sin apuro, sin ruido.
            </Text>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
