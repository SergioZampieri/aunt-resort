import Image from "next/image";
import { Box, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { services } from "../data/site";
import { Reveal } from "./Reveal";

/** The twelve service lines as rows: a lantern dot, then the text. */
export function ServicesList({ size = "md" }: { size?: "sm" | "md" }) {
  const dot = size === "sm" ? 6 : 7;
  return (
    <Stack gap={size === "sm" ? 12 : 13}>
      {services.map((service) => (
        <Box key={service} style={{ display: "flex", gap: size === "sm" ? 11 : 13, alignItems: "flex-start" }}>
          <Box
            style={{
              width: dot,
              height: dot,
              borderRadius: 4,
              backgroundColor: "var(--lantern)",
              flex: "none",
              marginTop: size === "sm" ? 8 : 9,
            }}
          />
          <Text fz={size === "sm" ? 14 : 15} lh={size === "sm" ? 1.6 : 1.65} c="pine.1">
            {service}
          </Text>
        </Box>
      ))}
    </Stack>
  );
}

/**
 * The breakfast beat: the arch-cropped table photo beside the full list.
 * Two columns from tablet up, stacked on phones.
 */
export function ServicesBand() {
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 26, md: 64 }} style={{ alignItems: "center" }}>
      <Reveal>
        <Box
          className="arch photo-grade"
          style={{
            position: "relative",
            height: "clamp(250px, 38vw, 480px)",
            ["--photo-brightness" as string]: 0.96,
          }}
        >
          <Image
            src="/images/sections/servicios.jpg"
            alt="Mesa servida con el desayuno"
            fill
            loading="lazy"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 62em) 100vw, 50vw"
          />
        </Box>
      </Reveal>
      <Reveal delay={100}>
        <Stack gap={0}>
          <Text className="eyebrow" c="lantern.4">
            La lista completa
          </Text>
          <Title
            order={2}
            className="display"
            fz={{ base: 30, md: 46 }}
            lh={1.04}
            pt={14}
            pb={22}
            style={{ letterSpacing: "-0.035em" }}
          >
            Todo lo que necesitás
          </Title>
          <ServicesList />
        </Stack>
      </Reveal>
    </SimpleGrid>
  );
}
