import Image from "next/image";
import { Box, Container, Stack, Text, Title } from "@mantine/core";

type PageHeaderProps = {
  title: string;
  image: string;
  /** Describes the photo for screen readers. Falls back to the page title. */
  imageAlt?: string;
  subtitle?: string;
  eyebrow?: string;
  /** Band height on phones; desktop grows from it. */
  height?: number;
  /** Where to anchor the crop, e.g. `"50% 58%"` to keep a sign in frame. */
  objectPosition?: string;
  /** Keep the title on one line at 44px instead of the display scale. */
  compact?: boolean;
};

/**
 * The dark photo band every page opens with. Text sits in the bottom-left
 * over a bottom-up scrim, the header floats over the top.
 */
export function PageHeader({
  title,
  image,
  imageAlt,
  subtitle,
  eyebrow,
  height = 330,
  objectPosition,
  compact,
}: PageHeaderProps) {
  return (
    <Box
      style={{
        position: "relative",
        minHeight: `clamp(${height}px, ${Math.round(height / 9)}vw, ${Math.round(height * 1.3)}px)`,
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        backgroundColor: "var(--pine-night)",
      }}
    >
      <Box
        className="photo-grade"
        style={{ position: "absolute", inset: 0, ["--photo-brightness" as string]: 0.94 }}
      >
        <Image
          src={image}
          alt={imageAlt ?? title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition }}
        />
      </Box>
      <Box
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, #0c1f1a 2%, rgba(12,31,26,0.26) 58%, rgba(12,31,26,0.3) 100%)",
        }}
      />
      <Container
        size="lg"
        w="100%"
        style={{ position: "relative", zIndex: 1 }}
        pb={{ base: 24, sm: 48 }}
        pt={{ base: 96, sm: 120 }}
      >
        <Stack gap={12} maw={720}>
          <Text className="eyebrow" c="lantern.4">
            {eyebrow ?? "Tandil · Buenos Aires"}
          </Text>
          <Title
            order={1}
            className="display"
            fz={compact ? { base: 44, sm: "var(--display)" } : "var(--display)"}
            lh={compact ? 1 : 0.98}
            style={{ textWrap: compact ? "nowrap" : "balance", paddingRight: 8 }}
          >
            {title}
          </Title>
          {subtitle ? (
            <Text c="pine.1" fz={{ base: 15, sm: "lg" }} lh={1.7} maw={620} mt={4}>
              {subtitle}
            </Text>
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}
