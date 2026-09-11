"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  useMatches,
} from "@mantine/core";
import { DatePickerInput, type DatesRangeValue, type DateStringValue } from "@mantine/dates";
import { IconCalendarSearch, IconUsers, IconX } from "@tabler/icons-react";
import type { Cabin } from "../data/cabins";
import { isCabinFullyAvailable, nightsBetween } from "../lib/availability";
import { bookingMessage } from "../lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

type CabinFinderProps = {
  cabins: Cabin[];
};

type Range = DatesRangeValue<DateStringValue>;

export function CabinFinder({ cabins }: CabinFinderProps) {
  const [range, setRange] = useState<Range>([null, null]);
  const [from, to] = range;
  const hasRange = Boolean(from && to);

  const available = useMemo(() => {
    if (!from || !to) {
      return cabins;
    }
    return cabins.filter((cabin) => isCabinFullyAvailable(cabin.id, from, to));
  }, [cabins, from, to]);

  const nights = hasRange ? nightsBetween(from!, to!) : 0;
  const pickerColumns = useMatches({ base: 1, sm: 2 });

  return (
    <Stack gap="xl">
      <Paper
        p={{ base: "lg", sm: "xl" }}
        radius="md"
        shadow="sm"
        className="g-card"
        style={{ border: "1px solid var(--hairline)" }}
      >
        <Group justify="space-between" align="flex-end" gap="md" wrap="wrap">
          <DatePickerInput
            type="range"
            value={range}
            onChange={setRange}
            label="¿Qué fechas buscás?"
            description="Elegí la fecha de llegada y la de salida"
            placeholder="Llegada — Salida"
            valueFormat="DD/MM/YYYY"
            minDate={new Date()}
            numberOfColumns={pickerColumns}
            leftSection={<IconCalendarSearch size={18} />}
            clearable
            allowSingleDateInRange={false}
            style={{ flex: "1 1 320px" }}
            popoverProps={{ withinPortal: true }}
          />
          {hasRange ? (
            <Button
              variant="subtle"
              color="pine"
              leftSection={<IconX size={16} />}
              onClick={() => setRange([null, null])}
            >
              Limpiar fechas
            </Button>
          ) : null}
        </Group>

        {hasRange ? (
          <Text fz="sm" c="dimmed" mt="md">
            {available.length === 0
              ? `No hay cabañas libres para esas ${nights} ${nights === 1 ? "noche" : "noches"}.`
              : `${available.length} de ${cabins.length} ${
                  available.length === 1 ? "cabaña disponible" : "cabañas disponibles"
                } para ${nights} ${nights === 1 ? "noche" : "noches"}.`}
          </Text>
        ) : null}
      </Paper>

      {hasRange && available.length === 0 ? (
        <Alert color="lantern" variant="light" radius="lg" title="Sin disponibilidad en esas fechas">
          <Stack gap="md" align="flex-start">
            <Text fz="sm">
              Probá con otras fechas o escribinos: a veces se liberan lugares antes de que
              actualicemos el calendario.
            </Text>
            <WhatsAppButton
              message={bookingMessage({ from, to })}
              label="Consultar igual por WhatsApp"
              size="sm"
            />
          </Stack>
        </Alert>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {available.map((cabin) => (
            <Card
              key={cabin.slug}
              className="hoverCard g-card"
              padding={0}
              radius="md"
              shadow="sm"
              style={{ overflow: "hidden", height: "100%" }}
            >
              <Link
                href={`/${cabin.slug}`}
                style={{ color: "inherit", textDecoration: "none", display: "block" }}
              >
                <Box style={{ position: "relative", height: 230, overflow: "hidden" }}>
                  <Image
                    src={cabin.sectionImage}
                    alt={`Vista de la ${cabin.name}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {hasRange ? (
                    <Badge
                      color="lake"
                      variant="filled"
                      radius="sm"
                      style={{ position: "absolute", top: 14, left: 14 }}
                    >
                      Libre en tus fechas
                    </Badge>
                  ) : null}
                </Box>
                <Box p="md">
                  <Group justify="space-between" mb={6} wrap="nowrap">
                    <Text fw={700} c="black" ff="var(--font-abhaya-libre)" fz="var(--h3)" lh={1.2}>
                      {cabin.name}
                    </Text>
                    <Badge
                      color="moss"
                      variant="light"
                      leftSection={<IconUsers size={12} />}
                    >
                      {cabin.capacity}
                    </Badge>
                  </Group>
                  <Text fz="sm" c="dimmed">
                    {cabin.shortDescription}
                  </Text>
                </Box>
              </Link>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {hasRange && available.length > 0 ? (
        <Group justify="center">
          <WhatsAppButton
            message={bookingMessage({ from, to })}
            label="Reservar estas fechas por WhatsApp"
          />
        </Group>
      ) : null}
    </Stack>
  );
}
