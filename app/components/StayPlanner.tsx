"use client";

import dayjs from "dayjs";
import "dayjs/locale/es";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Box, Button, Text, useMatches } from "@mantine/core";
import type { Cabin } from "../data/cabins";
import { isCabinFullyAvailable, labelForDate, nightsBetween } from "../lib/availability";
import { BookingSheet } from "./BookingSheet";
import { DayStrip } from "./DayStrip";

const ISO = "YYYY-MM-DD";
const isIso = (value: string | null): value is string => Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));

function fmt(date: string) {
  return dayjs(date).locale("es").format("D [de] MMMM");
}

/**
 * The dates half of a cabin page. Arrives pre-filled from the finder
 * (`?from&to&guests`), lets the visitor nudge check-in and checkout on the
 * day strip, and hands the stay to the request sheet.
 *
 * Tapping on or before check-in moves check-in; anything later sets checkout
 * to the day after the tapped day. Booked days are inert.
 */
export function StayPlanner({ cabin }: { cabin: Cabin }) {
  const params = useSearchParams();
  const initialFrom = params.get("from");
  const initialTo = params.get("to");
  const initialGuests = Number(params.get("guests"));

  const [from, setFrom] = useState<string | null>(isIso(initialFrom) ? initialFrom : null);
  const [to, setTo] = useState<string | null>(isIso(initialTo) ? initialTo : null);
  const [guests, setGuests] = useState(
    Number.isInteger(initialGuests) && initialGuests >= 1 && initialGuests <= 8 ? initialGuests : 5,
  );
  const [sheetOpen, setSheetOpen] = useState(false);
  const days = useMatches({ base: 14, md: 28 });

  const today = dayjs().startOf("day");
  const anchor = from ? dayjs(from) : today;
  const twoBefore = anchor.subtract(2, "day");
  const start = twoBefore.isBefore(today) ? today : twoBefore;

  const hasRange = from !== null && to !== null;
  const available = hasRange ? isCabinFullyAvailable(cabin.id, from, to) : true;
  const nights = hasRange ? nightsBetween(from, to) : 0;
  const blockedLabel = hasRange ? labelForDate(cabin.id, from) : undefined;

  function pick(date: string) {
    if (from === null || date <= from) {
      setFrom(date);
      if (to === null || to <= date) {
        setTo(dayjs(date).add(1, "day").format(ISO));
      }
      return;
    }
    setTo(dayjs(date).add(1, "day").format(ISO));
  }

  const hint = !hasRange
    ? "Tocá un día para marcar la llegada; el siguiente toque marca la salida."
    : !available
      ? `Los días tachados no están disponibles${blockedLabel ? ` (${blockedLabel.toLowerCase()})` : ""}. Probá con otras fechas.`
      : `${nights} ${nights === 1 ? "noche" : "noches"}, del ${fmt(from)} al ${fmt(to)}.`;

  const ctaLabel = hasRange && available ? "Reservar estas fechas" : "Consultar esta cabaña";

  const cta = (
    <Button
      className="pill"
      fullWidth
      color="lantern"
      c="pine.9"
      onClick={() => setSheetOpen(true)}
      style={{ boxShadow: "0 12px 32px rgba(12,31,26,0.5)", pointerEvents: "auto" }}
      styles={{ root: { backgroundColor: "var(--lantern)", color: "var(--pine-deep)" } }}
    >
      {ctaLabel}
    </Button>
  );

  return (
    <>
      <Box className="ruled-light" mt={28}>
        <Text className="eyebrow" c="pine.3">
          Llegada y salida · {anchor.locale("es").format("MMMM")}
        </Text>
        <DayStrip
          cabinId={cabin.id}
          cabinName={cabin.name}
          start={start.format(ISO)}
          days={days}
          from={from}
          to={to}
          onPick={pick}
        />
        <Text fz={12.5} lh={1.55} c="pine.2" pt={11}>
          {hint}
        </Text>
      </Box>

      {/* Desktop: the button sits in the flow. */}
      <Box visibleFrom="sm" mt={24}>
        {cta}
      </Box>

      {/* Phone: it floats 88px off the bottom, over the tab bar. */}
      <Box
        hiddenFrom="sm"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: "var(--tab-bar-h)",
          padding: "0 16px 12px",
          zIndex: 150,
          pointerEvents: "none",
        }}
      >
        {cta}
      </Box>

      <BookingSheet
        opened={sheetOpen}
        onClose={() => setSheetOpen(false)}
        cabin={cabin}
        from={hasRange && available ? from : null}
        to={hasRange && available ? to : null}
        guests={guests}
        onGuestsChange={setGuests}
      />
    </>
  );
}
