import { Box, Container, Flex, Text, Title } from "@mantine/core";
import { HeroCarousel } from "./components/HeroCarousel";
import { MobileHero } from "./components/MobileHero";
import { CabinFinder } from "./components/CabinFinder";
import { StatStrip } from "./components/StatStrip";
import { CuratedMosaic } from "./components/CuratedMosaic";
import { ServicesBand } from "./components/ServicesList";
import { PromoCards } from "./components/PromoCards";
import { ArrivalBand } from "./components/ArrivalBand";
import { Reveal } from "./components/Reveal";
import { heroBanners, parkMosaic } from "./data/site";
import { cabins } from "./data/cabins";

/**
 * Finder-first. Phones open on the still hero and the two questions; the
 * park, services, promotions and directions live in their own tabs. From
 * `sm` up the page is one long scroll: carousel, finder bar overlapping it,
 * results, facts, mosaic, services, promotions, how to get there.
 */
export default function HomePage() {
  return (
    <>
      <Box hiddenFrom="sm">
        <MobileHero />
      </Box>
      <Box visibleFrom="sm">
        <HeroCarousel banners={heroBanners} />
      </Box>

      <Box className="g-night" style={{ position: "relative" }}>
        <Container size="lg" mt={{ base: 0, sm: -68 }} pt={{ base: 26, sm: 0 }} style={{ position: "relative" }}>
          <CabinFinder cabins={cabins} showPromoCard />
        </Container>

        <Box visibleFrom="sm">
          <Container size="lg" pt={64}>
            <StatStrip />
          </Container>

          <Container size="lg" pt={64}>
            <Text className="eyebrow ruled-light" c="pine.3" style={{ paddingTop: 20 }}>
              Parque y piscina
            </Text>
            <Box pt={22}>
              <CuratedMosaic tiles={parkMosaic} label="Parque y piscina de Mirador de Animas" />
            </Box>
          </Container>

          <Container size="lg" pt={80}>
            <ServicesBand />
          </Container>

          <Container size="lg" pt={80}>
            <Text className="eyebrow ruled-light" c="pine.3" style={{ paddingTop: 20 }}>
              Beneficios
            </Text>
            <Reveal>
              <Flex align="flex-end" justify="space-between" gap={40} pt={14} pb={26} wrap="wrap">
                <Title order={2} className="display" fz={46} lh={1.02} style={{ letterSpacing: "-0.035em" }}>
                  Armamos el presupuesto con vos
                </Title>
                <Text fz={15} lh={1.65} c="pine.2" maw={380} ta="right">
                  Contanos cuántos son y qué fechas mirás, y te pasamos la tarifa que te corresponda.
                </Text>
              </Flex>
            </Reveal>
            <PromoCards />
          </Container>

          <Box mt={80}>
            <ArrivalBand />
          </Box>
        </Box>

        <Box hiddenFrom="sm" pb={26} />
      </Box>
    </>
  );
}
