import { Box, SimpleGrid, Stack, Text } from "@mantine/core";
import { amenityHighlights } from "../data/site";
import { AmenityIcon } from "./AmenityIcon";
import { Reveal } from "./Reveal";

export function AmenityHighlights() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={{ base: "xl", md: 40 }}>
      {amenityHighlights.map((item, index) => (
        <Reveal key={item.title} delay={index * 100}>
          <Stack gap="md" align="flex-start">
            <AmenityIcon name={item.icon} />
            <Box>
              <Text className="display" fz="var(--h3)" lh={1.2} style={{ letterSpacing: "-0.02em" }}>
                {item.title}
              </Text>
              <Text fz="sm" lh={1.7} mt={6} c="pine.2">
                {item.description}
              </Text>
            </Box>
          </Stack>
        </Reveal>
      ))}
    </SimpleGrid>
  );
}
