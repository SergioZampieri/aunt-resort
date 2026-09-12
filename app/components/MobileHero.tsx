import Image from "next/image";
import { Box, Stack, Text } from "@mantine/core";
import { siteInfo } from "../data/site";

/**
 * The phone's opening frame: one still (banner-05) with the logo mark pinned
 * top-left, the eyebrow and the three-line display headline pinned bottom.
 * The desktop carousel takes over from `sm`.
 */
export function MobileHero() {
  return (
    <Box style={{ position: "relative", height: 470, overflow: "hidden" }}>
      <Box
        className="photo-grade kenburns"
        style={{ position: "absolute", inset: 0, ["--photo-brightness" as string]: 0.96 }}
      >
        <Image
          src="/images/hero/banner-05.jpg"
          alt="Parque arbolado del complejo al atardecer"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Box
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, #0c1f1a 2%, rgba(12,31,26,0.62) 44%, rgba(12,31,26,0.22) 100%)",
        }}
      />
      <Stack
        justify="flex-end"
        gap={0}
        style={{ position: "absolute", inset: 0, padding: "66px 20px 26px" }}
      >
        <Image
          src="/images/logo/logo-mark-light.png"
          alt={siteInfo.name}
          width={161}
          height={66}
          priority
          style={{ width: 52, height: "auto", opacity: 0.95, marginBottom: "auto" }}
        />
        <Text className="eyebrow" c="lantern.4" pb={13}>
          Tandil · sierras
        </Text>
        <Text className="display" fz={56} lh={0.96}>
          Confort
          <br />
          al pie de
          <br />
          las sierras
        </Text>
      </Stack>
    </Box>
  );
}
