import Image from "next/image";
import { Box, Container, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconArrowUpRight } from "@tabler/icons-react";
import { HeroCarousel } from "./components/HeroCarousel";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { StatStrip } from "./components/StatStrip";
import { LinkBox, LinkButton } from "./components/NavLinks";
import { Reveal } from "./components/Reveal";
import { Section, SectionHeading } from "./components/Section";
import { heroBanners, homeTeasers } from "./data/site";

export default function HomePage() {
  return (
    <>
      <HeroCarousel banners={heroBanners} />

      {/* ---- Welcome: type left, arched photograph right ---- */}
      <Section tone="paper">
        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          spacing={{ base: 48, md: 88 }}
          style={{ alignItems: "center" }}
        >
          <Reveal>
            <Stack gap="lg">
              <Text className="eyebrow ruled" c="lake.8">
                El complejo
              </Text>
              <Title order={2} style={{ textWrap: "balance" }}>
                Un lugar para no hacer nada durante unos días.
              </Title>
              <Text fz="lg" lh={1.85} c="dimmed">
                Mirador de Animas está al pie de las sierras de Tandil, a pocos minutos del
                centro. Cabañas independientes, parque abierto y el silencio que se escucha
                recién cuando apagás el motor.
              </Text>
            </Stack>
          </Reveal>

          <Reveal delay={120}>
            <Box
              className="arch"
              style={{
                position: "relative",
                height: "clamp(380px, 48vw, 560px)",
                boxShadow: "var(--mantine-shadow-lg)",
              }}
            >
              <Image
                src="/images/home/teaser-exteriores.jpg"
                alt="Parque arbolado del complejo con las sierras detrás"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Box>
          </Reveal>
        </SimpleGrid>

        <Box mt={{ base: 64, md: 104 }}>
          <StatStrip />
        </Box>
      </Section>

      {/* ---- Three ways in ---- */}
      <Section tone="deep">
        <SectionHeading
          eyebrow="Recorrido"
          title="Conocé el complejo"
          lead="Las cabañas, el parque y lo que está incluido en la estadía."
        />

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={{ base: "lg", md: 28 }} mt={{ base: 40, md: 64 }}>
          {homeTeasers.map((teaser, index) => (
            <Reveal key={teaser.title} delay={index * 110}>
              <LinkBox className="hoverCard" href={teaser.href}>
                <Box
                  style={{
                    position: "relative",
                    height: "clamp(280px, 34vw, 400px)",
                    overflow: "hidden",
                    borderRadius: "var(--mantine-radius-md)",
                  }}
                >
                  <Image
                    src={teaser.image}
                    alt={teaser.alt}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </Box>
                <Group justify="space-between" align="baseline" wrap="nowrap" mt="md">
                  <Text ff="var(--font-abhaya-libre)" fw={700} fz="var(--h3)" lh={1.2}>
                    {teaser.title}
                  </Text>
                  <Box c="lake.8" style={{ lineHeight: 0 }}>
                    <IconArrowUpRight size={19} />
                  </Box>
                </Group>
              </LinkBox>
            </Reveal>
          ))}
        </SimpleGrid>
      </Section>

      {/* ---- Closing invitation ---- */}
      <Box className="g-pine grain" style={{ position: "relative", overflow: "hidden" }}>
        <Container
          size="lg"
          style={{ position: "relative", zIndex: 1, paddingBlock: "var(--section-py)" }}
        >
          <Reveal>
            <Stack gap="lg" align="center" ta="center" maw={620} mx="auto">
              <Text className="eyebrow" c="lantern.4">
                Reservas
              </Text>
              <Title order={2} c="white" style={{ textWrap: "balance" }}>
                Elegí tus fechas y te confirmamos por WhatsApp.
              </Title>
              <Text c="oat.3" fz="lg" lh={1.75}>
                Sin formularios ni esperas. Mirá qué cabañas quedan libres y escribinos.
              </Text>
              <Group gap="sm" justify="center" mt="xs">
                <LinkButton href="/cabanas" size="md" radius="xl" color="lake">
                  Ver fechas libres
                </LinkButton>
                <WhatsAppButton variant="white" label="Escribinos" />
              </Group>
            </Stack>
          </Reveal>
        </Container>
      </Box>
    </>
  );
}
