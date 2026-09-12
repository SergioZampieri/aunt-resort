"use client";

import Image from "next/image";
import { useState } from "react";
import { Box, UnstyledButton } from "@mantine/core";
import { IconArrowsMaximize } from "@tabler/icons-react";
import { Lightbox } from "./Lightbox";

type Tile = { src: string; alt: string };

type CuratedMosaicProps = {
  tiles: Tile[];
  label: string;
};

/**
 * The six-tile park sequence on the `.mosaicCurated` grid. The sixth tile is
 * the wide band, so its crop sits a little low to keep the hammock in frame.
 */
export function CuratedMosaic({ tiles, label }: CuratedMosaicProps) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <Box className="mosaicCurated">
        {tiles.map((tile, i) => (
          <UnstyledButton
            key={tile.src}
            className="zoomable photo-grade"
            style={{ ["--photo-brightness" as string]: 0.98 }}
            onClick={() => setIndex(i)}
            aria-label={`Ampliar foto ${i + 1} de ${tiles.length}: ${tile.alt}`}
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              loading={i < 2 ? "eager" : "lazy"}
              style={{ objectFit: "cover", objectPosition: i === 5 ? "50% 60%" : undefined }}
              sizes={i === 0 || i === 5 ? "(max-width: 48em) 100vw, 640px" : "(max-width: 48em) 50vw, 320px"}
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
                background: "rgba(12,31,26,0.35)",
                transition: "opacity 350ms var(--ease)",
              }}
            >
              <IconArrowsMaximize size={22} />
            </Box>
          </UnstyledButton>
        ))}
      </Box>

      <Lightbox
        images={tiles.map((tile) => tile.src)}
        label={label}
        index={index}
        onClose={() => setIndex(null)}
      />
    </>
  );
}
