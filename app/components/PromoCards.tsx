import { Box, SimpleGrid, Stack, Text } from "@mantine/core";
import { promotions } from "../data/site";
import { Reveal } from "./Reveal";

/** The two promotions as surface cards: lake eyebrow, title, body. */
export function PromoCards() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 10, sm: 18 }}>
      {promotions.map((promo, index) => (
        <Reveal key={promo.title} delay={index * 120}>
          <Box className="surface" p={{ base: 20, md: 28 }} h="100%">
            <Stack gap={0}>
              <Text className="eyebrow" c="lake.4">
                Promoción
              </Text>
              <Text
                className="display"
                fw={600}
                fz={{ base: 24, md: 27 }}
                lh={1.15}
                pt={{ base: 10, md: 12 }}
                pb={{ base: 9, md: 10 }}
                style={{ letterSpacing: "-0.025em" }}
              >
                {promo.title}
              </Text>
              <Text fz={{ base: 14, md: 14.5 }} lh={1.7} c="pine.2">
                {promo.description}
              </Text>
            </Stack>
          </Box>
        </Reveal>
      ))}
    </SimpleGrid>
  );
}
