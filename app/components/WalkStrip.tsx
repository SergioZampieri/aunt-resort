"use client";

import Image from "next/image";
import { useState } from "react";
import { Box, UnstyledButton } from "@mantine/core";
import { Lightbox } from "./Lightbox";

type WalkStripProps = {
  images: string[];
  label: string;
};

/**
 * The cabin filmstrip: a horizontal walk through the unit (galería →
 * living → cocina → habitaciones → terraza). Any tile opens the lightbox.
 */
export function WalkStrip({ images, label }: WalkStripProps) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <Box className="walkStrip" role="list" aria-label={`Fotos de ${label}`}>
        {images.map((src, i) => (
          <UnstyledButton
            key={src}
            role="listitem"
            className="walkTile photo-grade"
            style={{ ["--photo-brightness" as string]: 0.98 }}
            onClick={() => setIndex(i)}
            aria-label={`Ampliar foto ${i + 1} de ${images.length}`}
          >
            <Image
              src={src}
              alt={`${label} (foto ${i + 1} de ${images.length})`}
              fill
              loading={i < 4 ? "eager" : "lazy"}
              style={{ objectFit: "cover" }}
              sizes="176px"
            />
          </UnstyledButton>
        ))}
      </Box>
      <Lightbox images={images} label={label} index={index} onClose={() => setIndex(null)} />
    </>
  );
}
