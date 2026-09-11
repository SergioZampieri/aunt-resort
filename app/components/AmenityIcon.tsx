import { Box } from "@mantine/core";
import {
  IconCoffee,
  IconDeviceTv,
  IconWifi,
  IconBed,
  IconSparkles,
} from "@tabler/icons-react";

const icons = {
  breakfast: IconCoffee,
  tv: IconDeviceTv,
  wifi: IconWifi,
  bed: IconBed,
} as const;

export type AmenityIconName = keyof typeof icons;

export function AmenityIcon({ name, inverted }: { name: string; inverted?: boolean }) {
  const Icon = icons[name as AmenityIconName] ?? IconSparkles;

  return (
    <Box
      style={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        border: `1px solid ${inverted ? "var(--hairline-light)" : "var(--hairline)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: inverted ? "var(--mantine-color-lantern-4)" : "var(--mantine-color-lake-8)",
      }}
    >
      <Icon size={24} stroke={1.4} />
    </Box>
  );
}
