import Image from "next/image";
import { Suspense } from "react";
import { Box, Container, Grid, GridCol, Group, Stack, Text, Title } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { type Cabin, getFilmstripImages } from "../data/cabins";
import { LinkActionIcon, LinkAnchor } from "./NavLinks";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
import { StayPlanner } from "./StayPlanner";
import { WalkStrip } from "./WalkStrip";

type CabinPageProps = {
  cabin: Cabin;
};

/**
 * One unit: the hero, the walk through it, what it has, and the dates —
 * ending in "Reservar estas fechas". The month calendar stays for desktop,
 * where there is room to browse further ahead.
 */
export function CabinPage({ cabin }: CabinPageProps) {
  const images = getFilmstripImages(cabin);

  return (
    <Box className="g-night" pb={{ base: 84, sm: "var(--section-py)" }}>
      <Box style={{ position: "relative", height: "clamp(384px, 50vw, 520px)", overflow: "hidden" }}>
        <Box
          className="photo-grade"
          style={{ position: "absolute", inset: 0, ["--photo-brightness" as string]: 0.97 }}
        >
          <Image
            src={cabin.sectionImage}
            alt={`Vista de la ${cabin.name.toLowerCase()}`}
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
              "linear-gradient(to top, #0c1f1a 1%, rgba(12,31,26,0.3) 48%, rgba(12,31,26,0.3) 100%)",
          }}
        />
        <LinkActionIcon
          hiddenFrom="sm"
          href="/"
          aria-label="Volver a los resultados"
          size={46}
          radius="xl"
          variant="filled"
          color="rgba(12,31,26,0.55)"
          style={{
            position: "absolute",
            top: 56,
            left: 16,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "var(--paper)",
          }}
        >
          <IconChevronLeft size={24} stroke={1.5} />
        </LinkActionIcon>
        <Container size="lg" style={{ position: "absolute", inset: "auto 0 0 0", zIndex: 1 }} pb={{ base: 20, sm: 40 }}>
          <Text className="eyebrow" c="lantern.4" pb={10}>
            {cabin.capacity}
          </Text>
          <Title order={1} className="display" fz={{ base: 44, sm: "var(--display)" }} lh={0.98}>
            {cabin.name}
          </Title>
        </Container>
      </Box>

      <Container size="lg" pt={14}>
        <WalkStrip images={images} label={`${cabin.name} — Mirador de Animas`} />

        <Grid gap={{ base: 0, md: 64 }} pt={{ base: 22, md: 40 }}>
          <GridCol span={{ base: 12, md: 7 }}>
            <Stack gap={0}>
              <Group visibleFrom="sm" pb={16}>
                <LinkAnchor href="/" c="lake.4" fz={13} fw={600} underline="never">
                  ‹ Cambiar fechas
                </LinkAnchor>
              </Group>
              <Text fz={15} lh={1.7} c="pine.1" style={{ textWrap: "pretty" }}>
                {cabin.shortDescription}
              </Text>
              <Text fz={13} lh={1.65} c="pine.2" pt={11}>
                {cabin.parkNote}
              </Text>
              <Group gap={7} pt={20}>
                {cabin.amenities.map((amenity) => (
                  <Text
                    key={amenity}
                    fz={12.5}
                    fw={500}
                    lh={1}
                    c="pine.1"
                    px={13}
                    py={9}
                    style={{
                      borderRadius: "var(--mantine-radius-sm)",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid var(--hairline-light)",
                    }}
                  >
                    {amenity}
                  </Text>
                ))}
              </Group>
            </Stack>
          </GridCol>

          <GridCol span={{ base: 12, md: 5 }}>
            <Suspense fallback={null}>
              <StayPlanner cabin={cabin} />
            </Suspense>
          </GridCol>
        </Grid>

        <Box visibleFrom="md" className="ruled-light" mt={56}>
          <Text className="eyebrow" c="pine.3" pb={18}>
            Disponibilidad por mes
          </Text>
          <AvailabilityCalendar cabinId={cabin.id} cabinName={cabin.name} />
        </Box>
      </Container>
    </Box>
  );
}
