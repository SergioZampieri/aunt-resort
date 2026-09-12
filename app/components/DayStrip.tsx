"use client";

import dayjs from "dayjs";
import "dayjs/locale/es";
import { Box, Group, Text, UnstyledButton } from "@mantine/core";
import { isDateBooked, labelForDate } from "../lib/availability";

type DayStripProps = {
  cabinId: string;
  cabinName: string;
  /** First tile, "YYYY-MM-DD". */
  start: string;
  days: number;
  /** Check-in, inclusive. */
  from: string | null;
  /** Checkout day — the night before it is the last one selected. */
  to: string | null;
  onPick: (date: string) => void;
};

/**
 * A horizontally scrollable run of day tiles. Selected nights are lake,
 * free days are the surface, booked days are lighter and struck through —
 * lightness and a strike, not hue alone, tell them apart.
 */
export function DayStrip({ cabinId, cabinName, start, days, from, to, onPick }: DayStripProps) {
  const first = dayjs(start);
  const dates = Array.from({ length: days }, (_, i) => first.add(i, "day"));

  return (
    <Box>
      <Box className="dayStrip" role="group" aria-label={`Llegada y salida en ${cabinName}`}>
        {dates.map((date) => {
          const iso = date.format("YYYY-MM-DD");
          const booked = isDateBooked(cabinId, iso);
          const reason = labelForDate(cabinId, iso);
          const selected = !booked && from !== null && to !== null && iso >= from && iso < to;
          const readable = date.locale("es").format("dddd D [de] MMMM");
          const status = booked
            ? `no disponible${reason ? ` (${reason})` : ""}`
            : selected
              ? "una de tus noches"
              : "disponible";

          return (
            <UnstyledButton
              key={iso}
              className="dayTile"
              data-booked={booked || undefined}
              data-selected={selected || undefined}
              aria-pressed={selected}
              aria-disabled={booked || undefined}
              aria-label={`${readable}: ${status}`}
              title={reason ?? (booked ? "No disponible" : undefined)}
              onClick={booked ? undefined : () => onPick(iso)}
            >
              <span className="dayDow">{date.locale("es").format("ddd").replace(".", "")}</span>
              <span className="dayNum">{date.format("D")}</span>
            </UnstyledButton>
          );
        })}
      </Box>

      <Group gap={20} pt={11}>
        <Group gap={8}>
          <Box w={14} h={14} style={{ borderRadius: 4, backgroundColor: "var(--lake)" }} />
          <Text fz={11.5} lh={1} c="pine.2">
            Tus noches
          </Text>
        </Group>
        <Group gap={8}>
          <Box
            w={14}
            h={14}
            style={{
              borderRadius: 4,
              backgroundColor: "rgba(237,230,216,0.22)",
              border: "1px solid rgba(237,230,216,0.3)",
            }}
          />
          <Text fz={11.5} lh={1} c="pine.2">
            No disponible
          </Text>
        </Group>
      </Group>
    </Box>
  );
}
