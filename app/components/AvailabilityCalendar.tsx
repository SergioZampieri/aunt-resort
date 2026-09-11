"use client";

import dayjs from "dayjs";
import "dayjs/locale/es";
import { Calendar } from "@mantine/dates";
import { Box, Group, Stack, Text, useMatches } from "@mantine/core";
import { isDateBooked, labelForDate } from "../lib/availability";

type AvailabilityCalendarProps = {
  cabinId: string;
  cabinName: string;
};

function LegendSwatch({ color, border, children }: { color: string; border?: string; children: string }) {
  return (
    <Group gap={8}>
      <Box
        w={14}
        h={14}
        style={{
          borderRadius: 4,
          backgroundColor: color,
          border: border ? `1px solid ${border}` : undefined,
        }}
      />
      <Text fz="xs" c="dimmed">
        {children}
      </Text>
    </Group>
  );
}

export function AvailabilityCalendar({ cabinId, cabinName }: AvailabilityCalendarProps) {
  // Two months side by side need ~600px; on a phone that pushes the page
  // into horizontal scroll, so show one and let the arrows do the rest.
  const columns = useMatches({ base: 1, sm: 2 });

  return (
    <Stack gap="md">
      <Calendar
        numberOfColumns={columns}
        minDate={dayjs().startOf("month").format("YYYY-MM-DD")}
        ariaLabels={{
          nextMonth: "Mes siguiente",
          previousMonth: "Mes anterior",
          monthLevelControl: "Cambiar de mes",
          yearLevelControl: "Cambiar de año",
        }}
        getDayProps={(dateString) => {
          const booked = isDateBooked(cabinId, dateString);
          const reason = labelForDate(cabinId, dateString);
          const readable = dayjs(dateString).locale("es").format("D [de] MMMM");

          return {
            // Days stay focusable so the status is reachable by keyboard and
            // screen reader, not just by hovering for the tooltip.
            "aria-label": booked
              ? `${readable}: no disponible${reason ? ` (${reason})` : ""} en ${cabinName}`
              : `${readable}: disponible en ${cabinName}`,
            title: reason ?? (booked ? "No disponible" : "Disponible"),
            // Distinguished by lightness and a strike, not by hue alone.
            style: booked
              ? {
                  backgroundColor: "var(--mantine-color-oat-3)",
                  color: "var(--mantine-color-oat-8)",
                  textDecoration: "line-through",
                  cursor: "not-allowed",
                }
              : {
                  backgroundColor: "var(--mantine-color-moss-1)",
                  color: "var(--mantine-color-pine-9)",
                  fontWeight: 700,
                },
          };
        }}
      />
      <Group gap="xl">
        <LegendSwatch color="var(--mantine-color-moss-1)" border="var(--mantine-color-moss-3)">
          Disponible
        </LegendSwatch>
        <LegendSwatch color="var(--mantine-color-oat-3)" border="var(--mantine-color-oat-5)">
          No disponible
        </LegendSwatch>
      </Group>
    </Stack>
  );
}
