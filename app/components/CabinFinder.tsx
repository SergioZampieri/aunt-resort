"use client";

import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useMemo, useRef, useState } from "react";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  UnstyledButton,
  useMatches,
} from "@mantine/core";
import { DatePicker, type DatesRangeValue, type DateStringValue } from "@mantine/dates";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import type { Cabin } from "../data/cabins";
import { isCabinFullyAvailable, nightsBetween } from "../lib/availability";
import { bookingMessage } from "../lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

type CabinFinderProps = {
  cabins: Cabin[];
  /** The "Estadías prolongadas" card under the phone finder (home only). */
  showPromoCard?: boolean;
};

type Range = DatesRangeValue<DateStringValue>;
type PresetId = "p1" | "p2" | "p3" | "custom";

const MIN_GUESTS = 1;
const MAX_GUESTS = 8;
const DEFAULT_GUESTS = 5;
const ISO = "YYYY-MM-DD";

const es = (date: dayjs.Dayjs | string) => dayjs(date).locale("es");

/** "18 de septiembre" */
function fmtLong(date: string) {
  return es(date).format("D [de] MMMM");
}

/** "vie 18 a dom 20 de septiembre" — the weekday helps more than the year. */
function fmtRange(from: string, to: string) {
  const a = es(from);
  const b = es(to);
  const dow = (d: dayjs.Dayjs) => d.format("ddd").replace(".", "");
  if (a.month() === b.month()) {
    return `${dow(a)} ${a.format("D")} a ${dow(b)} ${b.format("D [de] MMMM")}`;
  }
  return `${dow(a)} ${a.format("D [de] MMMM")} a ${dow(b)} ${b.format("D [de] MMMM")}`;
}

function plural(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`;
}

/** Presets computed from today, so they never go stale. */
function usePresets() {
  return useMemo(() => {
    const today = dayjs().startOf("day");
    let friday = today.add(1, "day");
    while (friday.day() !== 5) {
      friday = friday.add(1, "day");
    }
    const longFriday = friday.add(7, "day");

    let january = dayjs(`${today.year()}-01-09`);
    if (!january.isAfter(today, "day")) {
      january = january.add(1, "year");
    }

    return [
      { id: "p1" as const, label: "Este finde", from: friday.format(ISO), to: friday.add(2, "day").format(ISO) },
      { id: "p2" as const, label: "Finde largo", from: longFriday.format(ISO), to: longFriday.add(3, "day").format(ISO) },
      { id: "p3" as const, label: "Enero", from: january.format(ISO), to: january.add(8, "day").format(ISO) },
    ];
  }, []);
}

/* ---------------------------------------------------------------- pieces */

const eyebrowProps = { className: "eyebrow", c: "pine.3" } as const;

function tileStyle(selected: boolean): React.CSSProperties {
  return {
    borderRadius: "var(--mantine-radius-md)",
    backgroundColor: selected ? "var(--pine)" : "var(--surface)",
    border: `1px solid ${selected ? "var(--lake-bright)" : "var(--hairline-light)"}`,
    transition: "background-color 250ms var(--ease), border-color 250ms var(--ease)",
  };
}

function NightsPill({ selected, children }: { selected: boolean; children: React.ReactNode }) {
  return (
    <Text
      fz={11}
      fw={600}
      lh={1}
      px={10}
      py={7}
      style={{
        flex: "none",
        whiteSpace: "nowrap",
        borderRadius: "var(--mantine-radius-sm)",
        backgroundColor: selected ? "var(--lantern)" : "rgba(255,255,255,0.08)",
        color: selected ? "var(--pine-deep)" : "var(--text-2)",
      }}
    >
      {children}
    </Text>
  );
}

function StepButton({
  label,
  disabled,
  onClick,
  size,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  size: number;
  children: React.ReactNode;
}) {
  return (
    <ActionIcon
      variant="filled"
      color="rgba(255,255,255,0.09)"
      size={size}
      radius="xl"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      style={{ color: "var(--paper)" }}
    >
      {children}
    </ActionIcon>
  );
}

/* ---------------------------------------------------------------- finder */

export function CabinFinder({ cabins, showPromoCard }: CabinFinderProps) {
  const presets = usePresets();
  const [preset, setPreset] = useState<PresetId>("p1");
  const [custom, setCustom] = useState<Range>([null, null]);
  const [guests, setGuests] = useState(DEFAULT_GUESTS);
  const [pickerOpen, setPickerOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const pickerColumns = useMatches({ base: 1, sm: 2 });

  const stay = useMemo(() => {
    if (preset === "custom") {
      return { from: custom[0], to: custom[1] };
    }
    const p = presets.find((x) => x.id === preset) ?? presets[0];
    return { from: p.from, to: p.to };
  }, [preset, custom, presets]);

  const { from, to } = stay;
  const hasRange = Boolean(from && to);
  const nights = hasRange ? nightsBetween(from!, to!) : 0;

  const freeByDate = useMemo(
    () => (hasRange ? cabins.filter((c) => isCabinFullyAvailable(c.id, from!, to!)) : cabins),
    [cabins, hasRange, from, to],
  );
  const results = freeByDate.filter((c) => c.max >= guests);
  const tooSmall = freeByDate.filter((c) => c.max < guests);

  const customLabel = custom[0] && custom[1] ? fmtRange(custom[0], custom[1]) : "Elegí llegada y salida";
  const guestsWord = guests === 1 ? "persona" : "personas";

  const countLine =
    results.length === 0
      ? "Nada libre"
      : `${results.length} de ${cabins.length} ${results.length === 1 ? "cabaña disponible" : "cabañas disponibles"}`;
  const subLine = hasRange
    ? `${fmtLong(from!)} al ${fmtLong(to!)} · ${plural(nights, "noche", "noches")} · ${guests} ${guestsWord}`
    : `Todas las fechas · ${guests} ${guestsWord}`;

  const excludedNote =
    tooSmall.length > 0
      ? `${tooSmall.map((c) => c.name).join(" y ")} también ${
          tooSmall.length === 1 ? "está libre, pero entra" : "están libres, pero entran"
        } hasta ${Math.max(...tooSmall.map((c) => c.max))} personas.`
      : null;

  const cabinHref = (cabin: Cabin) =>
    hasRange ? `/${cabin.slug}?from=${from}&to=${to}&guests=${guests}` : `/${cabin.slug}?guests=${guests}`;

  function showResults() {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function onCustomChange(value: Range) {
    setCustom(value);
    if (value[0] && value[1]) {
      setPreset("custom");
      setPickerOpen(false);
    }
  }

  const stepper = (size: "sm" | "lg") => (
    <Group gap={size === "lg" ? 0 : 10} justify="space-between" wrap="nowrap">
      <StepButton
        label="Menos personas"
        size={size === "lg" ? 48 : 44}
        disabled={guests <= MIN_GUESTS}
        onClick={() => setGuests((g) => Math.max(MIN_GUESTS, g - 1))}
      >
        <IconMinus size={size === "lg" ? 22 : 20} stroke={1.5} />
      </StepButton>
      <Box ta="center" miw={52}>
        <Text
          className="display"
          fz={size === "lg" ? 40 : 30}
          lh={1}
          style={{ letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}
        >
          {guests}
        </Text>
        {size === "lg" ? (
          <Text fz={11.5} lh={1} c="pine.2" pt={5}>
            {guestsWord}
          </Text>
        ) : null}
      </Box>
      <StepButton
        label="Más personas"
        size={size === "lg" ? 48 : 44}
        disabled={guests >= MAX_GUESTS}
        onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
      >
        <IconPlus size={size === "lg" ? 22 : 20} stroke={1.5} />
      </StepButton>
    </Group>
  );

  return (
    <Stack gap={0}>
      {/* ---- Desktop: one bar over the hero's bottom edge ---- */}
      <Box
        visibleFrom="sm"
        style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(20,51,43,0.96)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid var(--hairline-light)",
          borderRadius: 12,
          padding: "22px 24px",
          display: "flex",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 28,
        }}
      >
        <Box style={{ flex: "1 1 460px", minWidth: 0 }}>
          <Text {...eyebrowProps} pb={13}>
            ¿Qué fechas buscás?
          </Text>
          <Group gap={9} grow wrap="nowrap" align="stretch">
            {presets.map((p) => {
              const selected = preset === p.id;
              return (
                <UnstyledButton
                  key={p.id}
                  onClick={() => setPreset(p.id)}
                  aria-pressed={selected}
                  px={16}
                  py={13}
                  style={tileStyle(selected)}
                >
                  <Text className="display" fw={600} fz={16} lh={1.2} style={{ letterSpacing: "-0.02em" }}>
                    {p.label}
                  </Text>
                  <Text fz={12} lh={1.4} pt={4} c={selected ? "lake.1" : "pine.2"}>
                    {fmtRange(p.from, p.to)}
                  </Text>
                </UnstyledButton>
              );
            })}
            <UnstyledButton
              onClick={() => setPickerOpen(true)}
              aria-pressed={preset === "custom"}
              px={16}
              py={13}
              style={tileStyle(preset === "custom")}
            >
              <Text className="display" fw={600} fz={16} lh={1.2} style={{ letterSpacing: "-0.02em" }}>
                Otras fechas
              </Text>
              <Text fz={12} lh={1.4} pt={4} c={preset === "custom" ? "lake.1" : "pine.2"}>
                {customLabel}
              </Text>
            </UnstyledButton>
          </Group>
        </Box>

        <Box style={{ flex: "none", width: 1, height: 76, backgroundColor: "var(--hairline-light)" }} />

        <Box style={{ flex: "none" }}>
          <Text {...eyebrowProps} pb={13}>
            ¿Cuántos son?
          </Text>
          {stepper("sm")}
        </Box>

        <Button className="pill" color="lake" px={30} onClick={showResults} style={{ flex: "none" }}>
          Ver cabañas libres
        </Button>
      </Box>

      {/* ---- Phone: the two questions as rows ---- */}
      <Stack hiddenFrom="sm" gap={0}>
        <Text {...eyebrowProps} className="eyebrow ruled-light">
          ¿Qué fechas buscás?
        </Text>
        <Stack gap={9} pt={15}>
          {presets.map((p) => {
            const selected = preset === p.id;
            const n = nightsBetween(p.from, p.to);
            return (
              <UnstyledButton
                key={p.id}
                onClick={() => setPreset(p.id)}
                aria-pressed={selected}
                px={18}
                py={16}
                style={{ ...tileStyle(selected), display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}
              >
                <Box miw={0}>
                  <Text className="display" fw={600} fz={19} lh={1.15} style={{ letterSpacing: "-0.02em" }}>
                    {p.label}
                  </Text>
                  <Text fz={12.5} lh={1.45} pt={4} c={selected ? "lake.1" : "pine.2"}>
                    {fmtRange(p.from, p.to)}
                  </Text>
                </Box>
                <NightsPill selected={selected}>{plural(n, "noche", "noches")}</NightsPill>
              </UnstyledButton>
            );
          })}
          <UnstyledButton
            onClick={() => setPickerOpen(true)}
            aria-pressed={preset === "custom"}
            px={18}
            py={16}
            style={{ ...tileStyle(preset === "custom"), display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}
          >
            <Box miw={0}>
              <Text className="display" fw={600} fz={19} lh={1.15} style={{ letterSpacing: "-0.02em" }}>
                Otras fechas
              </Text>
              <Text fz={12.5} lh={1.45} pt={4} c={preset === "custom" ? "lake.1" : "pine.2"}>
                {customLabel}
              </Text>
            </Box>
            <NightsPill selected={preset === "custom"}>
              {custom[0] && custom[1] ? plural(nightsBetween(custom[0], custom[1]), "noche", "noches") : "Elegir"}
            </NightsPill>
          </UnstyledButton>
        </Stack>

        <Text {...eyebrowProps} className="eyebrow ruled-light" mt={28}>
          ¿Cuántos son?
        </Text>
        <Box className="surface" mt={15} px={16} py={14}>
          {stepper("lg")}
        </Box>
        <Text fz={12} lh={1.55} c="pine.2" pt={11} px={2}>
          Comodidad para cinco personas, con opción hasta ocho.
        </Text>

        <Button className="pill" color="lake" fullWidth mt={22} onClick={showResults}>
          Ver cabañas libres
        </Button>
      </Stack>

      <Modal
        opened={pickerOpen}
        onClose={() => setPickerOpen(false)}
        title="Elegí llegada y salida"
        centered
        size="auto"
        radius="md"
      >
        <Stack gap="md" align="center">
          <DatePicker
            type="range"
            value={custom}
            onChange={onCustomChange}
            minDate={new Date()}
            numberOfColumns={pickerColumns}
            allowSingleDateInRange={false}
            size="md"
          />
          <Text fz="xs" c="pine.2">
            Tocá el día de llegada y después el de salida.
          </Text>
        </Stack>
      </Modal>

      {/* ---- Results ---- */}
      <Box ref={resultsRef} style={{ scrollMarginTop: 96 }} pt={{ base: 44, sm: 56 }}>
        <Flex
          direction={{ base: "column", sm: "row" }}
          align={{ base: "flex-start", sm: "flex-end" }}
          justify="space-between"
          gap={{ base: 9, sm: 40 }}
          pb={{ base: 22, sm: 26 }}
        >
          <Text
            component="h2"
            className="display"
            fz={{ base: 36, sm: 46 }}
            lh={1.02}
            style={{ letterSpacing: "-0.035em", margin: 0 }}
          >
            {countLine}
          </Text>
          <Text fz={{ base: 13.5, sm: 15 }} lh={1.55} c="pine.2" ta={{ base: "left", sm: "right" }}>
            {subLine}
          </Text>
        </Flex>

        {results.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 13, md: 18 }}>
            {results.map((cabin) => (
              <Box
                key={cabin.slug}
                component={Link}
                href={cabinHref(cabin)}
                className="hoverCard"
                style={{
                  position: "relative",
                  display: "block",
                  height: "clamp(244px, 30vw, 330px)",
                  borderRadius: 12,
                  overflow: "hidden",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <Box
                  className="photo-grade"
                  style={{ position: "absolute", inset: 0, ["--photo-brightness" as string]: 0.94 }}
                >
                  <Image
                    src={cabin.sectionImage}
                    alt={`Vista de la ${cabin.name.toLowerCase()}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 48em) 100vw, 33vw"
                  />
                </Box>
                <Box
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(12,31,26,0.9), rgba(12,31,26,0.04) 62%)",
                  }}
                />
                {hasRange ? (
                  <Text
                    fz={11}
                    fw={600}
                    lh={1}
                    c="white"
                    px={10}
                    py={7}
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                      backgroundColor: "var(--lake)",
                      borderRadius: "var(--mantine-radius-sm)",
                    }}
                  >
                    Libre en tus fechas
                  </Text>
                ) : null}
                <Flex
                  direction={{ base: "row", md: "column" }}
                  align={{ base: "flex-end", md: "flex-start" }}
                  justify="space-between"
                  gap={12}
                  style={{ position: "absolute", inset: "auto 0 0 0" }}
                  p={{ base: 18, md: 22 }}
                >
                  <Box miw={0}>
                    <Text className="display" fz={{ base: 31, md: 30 }} lh={1} style={{ letterSpacing: "-0.03em" }}>
                      {cabin.name}
                    </Text>
                    <Text fz={{ base: 12.5, md: 13.5 }} lh={1.45} pt={{ base: 6, md: 8 }} c="lake.1">
                      {cabin.parkNote}
                    </Text>
                  </Box>
                  <Text fz={12} lh={1.3} c="pine.2" ta={{ base: "right", md: "left" }} pt={{ base: 0, md: 4 }} style={{ flex: "none" }}>
                    {cabin.capacity}
                  </Text>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Flex
            direction={{ base: "column", sm: "row" }}
            align={{ base: "flex-start", sm: "center" }}
            justify="space-between"
            gap={{ base: 15, sm: 32 }}
            p={{ base: 20, sm: "26px 28px" }}
            style={{
              borderRadius: 12,
              backgroundColor: "rgba(217,164,65,0.12)",
              border: "1px solid rgba(217,164,65,0.4)",
            }}
          >
            <Box miw={0}>
              <Text className="display" fw={600} fz={{ base: 17, sm: 22 }} lh={1.25} style={{ letterSpacing: "-0.02em" }}>
                Sin disponibilidad en esas fechas
              </Text>
              <Text fz={{ base: 13, sm: 14 }} lh={1.65} c="pine.1" pt={{ base: 9, sm: 8 }} maw={560}>
                Probá con otras fechas o escribinos: a veces se liberan lugares antes de que
                actualicemos el calendario.
              </Text>
            </Box>
            <WhatsAppButton
              message={bookingMessage({ from, to, guests })}
              label="Consultar igual por WhatsApp"
              size="md"
            />
          </Flex>
        )}

        {excludedNote ? (
          <Box className="surface" mt={{ base: 15, sm: 16 }} px={{ base: 18, sm: 22 }} py={{ base: 16, sm: 18 }}>
            <Text fz={{ base: 12.5, sm: 13.5 }} lh={1.65} c="pine.2">
              {excludedNote}
            </Text>
          </Box>
        ) : null}
      </Box>

      {showPromoCard ? (
        <Box
          hiddenFrom="sm"
          component={Link}
          href="/promociones"
          mt={26}
          style={{
            position: "relative",
            display: "block",
            height: 206,
            borderRadius: "var(--mantine-radius-md)",
            overflow: "hidden",
            textDecoration: "none",
          }}
        >
          <Box
            className="photo-grade"
            style={{ position: "absolute", inset: 0, ["--photo-brightness" as string]: 0.9 }}
          >
            <Image
              src="/images/home/promos-inicio.jpg"
              alt="Promociones de temporada"
              fill
              loading="lazy"
              style={{ objectFit: "cover" }}
              sizes="100vw"
            />
          </Box>
          <Box
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(12,31,26,0.88), rgba(12,31,26,0.08))",
            }}
          />
          <Stack justify="flex-end" gap={0} p={18} style={{ position: "absolute", inset: 0 }}>
            <Text className="eyebrow" c="lantern.4">
              Beneficios
            </Text>
            <Text className="display" fw={600} fz={27} lh={1.08} pt={7} style={{ letterSpacing: "-0.025em" }}>
              Estadías
              <br />
              prolongadas
            </Text>
          </Stack>
        </Box>
      ) : null}
    </Stack>
  );
}
