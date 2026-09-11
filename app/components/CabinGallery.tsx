"use client";

import Image from "next/image";
import { useState } from "react";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Badge, Box, UnstyledButton } from "@mantine/core";
import { IconArrowsMaximize } from "@tabler/icons-react";
import { Lightbox } from "./Lightbox";

type CabinGalleryProps = {
  images: string[];
  alt: string;
};

const HEIGHT = "clamp(300px, 48vw, 560px)";

export function CabinGallery({ images, alt }: CabinGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [index, setIndex] = useState<number | null>(null);

  const tile = (src: string, i: number, priority?: boolean) => (
    <UnstyledButton
      className="zoomable"
      onClick={() => setIndex(i)}
      aria-label={`Ampliar foto ${i + 1} de ${images.length}`}
      style={{
        position: "relative",
        display: "block",
        width: "100%",
        height: HEIGHT,
        borderRadius: "var(--mantine-radius-md)",
        overflow: "hidden",
      }}
    >
      <Image
        src={src}
        alt={`${alt} (foto ${i + 1} de ${images.length})`}
        fill
        priority={priority}
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, 800px"
      />
      <Box
        aria-hidden
        className="tileHint"
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          color: "#fff",
          opacity: 0,
          background: "rgba(12,31,26,0.30)",
          transition: "opacity 350ms var(--ease)",
        }}
      >
        <IconArrowsMaximize size={24} />
      </Box>
    </UnstyledButton>
  );

  return (
    <Box style={{ position: "relative" }}>
      {images.length === 1 ? (
        tile(images[0], 0, true)
      ) : (
        <Carousel
          withIndicators
          height={HEIGHT}
          slideGap="sm"
          emblaOptions={{ loop: true }}
          controlsOffset="sm"
          onSlideChange={setCurrent}
        >
          {images.map((src, i) => (
            <CarouselSlide key={src}>{tile(src, i, i === 0)}</CarouselSlide>
          ))}
        </Carousel>
      )}

      {images.length > 1 ? (
        <Badge
          variant="filled"
          color="dark"
          radius="sm"
          style={{ position: "absolute", right: 14, bottom: 14, pointerEvents: "none" }}
        >
          {current + 1} / {images.length}
        </Badge>
      ) : null}

      <Lightbox images={images} label={alt} index={index} onClose={() => setIndex(null)} />
    </Box>
  );
}
