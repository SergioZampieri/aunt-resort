"use client";

import dayjs from "dayjs";
import "dayjs/locale/es";
import { Calendar } from "@mantine/dates";
import { Box, Group, Stack, Text } from "@mantine/core";
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
      <Text fz={11.5} c="pine.2">
        {children}
      </Text>
    </Group>
  );
}

/** Two months side by side, read-only, on the dark ground. Desktop only. */
export function AvailabilityCalendar({ cabinId, cabinName }: AvailabilityCalendarProps) {
  return (
    <Stack gap="md">
      <Calendar
        numberOfColumns={2}
        minDate={dayjs().startOf("month").format("YYYY-MM-DD")}
        ariaLabels={{
          nextMonth: "Mes siguiente",
          previousMonth: "Mes anterior",
          monthLevelControl: "Cambiar de mes",
          yearLevelControl: "Cambiar de año",
        }}
        styles={{
          calendarHeaderLevel: { color: "var(--paper)", fontWeight: 600 },
          calendarHeaderControl: { color: "var(--text-2)" },
          weekday: { color: "var(--text-3)", fontSize: 11 },
          day: { borderRadius: 8 },
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
                  backgroundColor: "rgba(237,230,216,0.14)",
                  color: "rgba(237,230,216,0.5)",
                  textDecoration: "line-through",
                  cursor: "not-allowed",
                }
              : {
                  backgroundColor: "var(--surface)",
                  color: "var(--paper)",
                  fontWeight: 600,
                },
          };
        }}
      />
      <Group gap={20}>
        <LegendSwatch color="var(--surface)" border="var(--hairline-light)">
          Disponible
        </LegendSwatch>
        <LegendSwatch color="rgba(237,230,216,0.22)" border="rgba(237,230,216,0.3)">
          No disponible
        </LegendSwatch>
      </Group>
    </Stack>
  );
}
