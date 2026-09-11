import { Box, SimpleGrid, Stack, Text } from "@mantine/core";
import { amenityHighlights } from "../data/site";
import { AmenityIcon } from "./AmenityIcon";
import { Reveal } from "./Reveal";

export function AmenityHighlights({ inverted }: { inverted?: boolean }) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={{ base: "xl", md: 40 }}>
      {amenityHighlights.map((item, index) => (
        <Reveal key={item.title} delay={index * 100}>
          <Stack gap="md" align="flex-start">
            <AmenityIcon name={item.icon} inverted={inverted} />
            <Box>
              <Text ff="var(--font-abhaya-libre)" fw={700} fz="var(--h3)" c={inverted ? "white" : undefined}>
                {item.title}
              </Text>
              <Text fz="sm" lh={1.7} mt={6} c={inverted ? "oat.2" : "dimmed"}>
                {item.description}
              </Text>
            </Box>
          </Stack>
        </Reveal>
      ))}
    </SimpleGrid>
  );
}
