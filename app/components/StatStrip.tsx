import { Box, Text } from "@mantine/core";
import { Reveal } from "./Reveal";

const facts = [
  { value: "6", label: "cabañas independientes" },
  { value: "5–8", label: "personas por cabaña" },
  { value: "2 min", label: "del centro de Tandil" },
  { value: "Incluido", label: "desayuno casero" },
];

/**
 * Quiet figures on a hairline grid — the facts a visitor scans for, without
 * shouting them.
 */
export function StatStrip() {
  return (
    <Box className="factGrid">
      {facts.map((fact, index) => (
        <Reveal key={fact.label} delay={index * 80}>
          <Box className="factCell">
            <Box className="factNumber" c="white">
              {fact.value}
            </Box>
            <Text fz="sm" lh={1.5} mt={10} c="oat.2" style={{ maxWidth: "18ch" }}>
              {fact.label}
            </Text>
          </Box>
        </Reveal>
      ))}
    </Box>
  );
}
