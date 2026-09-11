import Image from "next/image";
import { Box, Container, Group, Stack, Text, Title } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";

type PageHeaderProps = {
  title: string;
  image: string;
  /** Describes the photo for screen readers. Falls back to the page title. */
  imageAlt?: string;
  subtitle?: string;
  eyebrow?: string;
};

export function PageHeader({ title, image, imageAlt, subtitle, eyebrow }: PageHeaderProps) {
  return (
    <Box
      className="grain"
      style={{
        position: "relative",
        minHeight: "clamp(320px, 46vw, 460px)",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        backgroundColor: "var(--pine-night)",
      }}
    >
      <Image
        src={image}
        alt={imageAlt ?? title}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      <Box
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(178deg, rgba(11,28,23,0.78) 0%, rgba(11,28,23,0.28) 38%, rgba(11,28,23,0.88) 100%)",
        }}
      />
      <Container
        size="lg"
        w="100%"
        style={{ position: "relative", zIndex: 1 }}
        pb={{ base: 40, sm: 64 }}
        pt={{ base: 72, sm: 96 }}
      >
        <Stack gap="sm" maw={720}>
          <Group gap={8} c="lantern.3">
            <IconMapPin size={15} />
            <Text className="eyebrow">{eyebrow ?? "Tandil · Buenos Aires"}</Text>
          </Group>
          <Title order={1} c="white" fz="var(--display)" style={{ textWrap: "balance" }}>
            {title}
          </Title>
          {subtitle ? (
            <Text c="oat.2" fz={{ base: "md", sm: "lg" }} lh={1.65} maw={620}>
              {subtitle}
            </Text>
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}
