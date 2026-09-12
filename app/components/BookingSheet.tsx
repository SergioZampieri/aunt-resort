"use client";

import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useState } from "react";
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Modal,
  Stack,
  Text,
  Textarea,
  TextInput,
  UnstyledButton,
  useMatches,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import type { Cabin } from "../data/cabins";
import { nightsBetween } from "../lib/availability";
import { bookingMessage, whatsappHref } from "../lib/whatsapp";

type BookingSheetProps = {
  opened: boolean;
  onClose: () => void;
  cabin: Cabin;
  from: string | null;
  to: string | null;
  guests: number;
  onGuestsChange: (n: number) => void;
};

function fmt(date: string) {
  return dayjs(date).locale("es").format("D [de] MMMM");
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Group justify="space-between" align="baseline" gap={12} wrap="nowrap">
      <Text fz={13} lh={1} c="pine.2">
        {label}
      </Text>
      {children}
    </Group>
  );
}

/**
 * "Reservar estas fechas": a summary, a name, a note, and one button that
 * opens WhatsApp with the message already written. Nothing is posted
 * anywhere — the hosts confirm in the chat.
 */
export function BookingSheet({ opened, onClose, cabin, from, to, guests, onGuestsChange }: BookingSheetProps) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const fullScreen = useMatches({ base: true, sm: false });

  const hasRange = from !== null && to !== null;
  const nights = hasRange ? nightsBetween(from, to) : 0;
  const stayLabel = hasRange ? `${fmt(from)} al ${fmt(to)}` : "A confirmar";
  const guestsWord = guests === 1 ? "persona" : "personas";

  const message = bookingMessage({ cabinName: cabin.name, from, to, guests, name, note });

  const sentSummary = hasRange
    ? `Pedimos ${cabin.name} del ${fmt(from)} al ${fmt(to)}, ${nights} ${nights === 1 ? "noche" : "noches"}, ${guests} ${guestsWord}. Te respondemos por WhatsApp.`
    : `Consultamos por ${cabin.name} para ${guests} ${guestsWord}. Te respondemos por WhatsApp.`;

  function close() {
    onClose();
    // Reset after the exit transition so the form does not flash empty.
    window.setTimeout(() => setSent(false), 300);
  }

  const inputStyles = {
    input: {
      backgroundColor: "var(--surface)",
      borderColor: "rgba(255,255,255,0.18)",
      color: "var(--paper)",
      fontSize: 15,
      borderRadius: "var(--mantine-radius-md)",
    },
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      fullScreen={fullScreen}
      centered
      size={440}
      radius="md"
      padding={0}
      withCloseButton={false}
      styles={{ content: { backgroundColor: "var(--pine-night)" }, body: { padding: 0 } }}
      transitionProps={{ transition: "fade-up", duration: 300 }}
      aria-label={sent ? "Mensaje enviado" : "Reservar estas fechas"}
    >
      {sent ? (
        <Box>
          <Box
            className="photo-grade"
            style={{ position: "relative", height: fullScreen ? 296 : 200, overflow: "hidden", ["--photo-brightness" as string]: 0.92 }}
          >
            <Image
              src="/images/hero/banner-06.jpg"
              alt="Frente de las cabañas con luces cálidas"
              fill
              style={{ objectFit: "cover" }}
              sizes="440px"
            />
            <Box
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, #0c1f1a 2%, rgba(12,31,26,0.3))",
              }}
            />
          </Box>
          <Stack align="center" ta="center" gap={0} px={22} pt={6} pb={28}>
            <Text className="display" fz={38} lh={1.02} style={{ letterSpacing: "-0.032em" }}>
              Mensaje
              <br />
              enviado
            </Text>
            <Text fz={14.5} lh={1.7} c="pine.2" pt={15} style={{ textWrap: "pretty" }}>
              {sentSummary}
            </Text>
            <Button
              component={Link}
              href="/"
              className="pill"
              variant="outline"
              color="oat.1"
              fullWidth
              mt={26}
              style={{ borderColor: "rgba(255,255,255,0.22)" }}
            >
              Buscar otras fechas
            </Button>
          </Stack>
        </Box>
      ) : (
        <Stack gap={0} px={16} pt={fullScreen ? 70 : 22} pb={28}>
          <UnstyledButton onClick={close} py={6} pb={16} style={{ alignSelf: "flex-start" }}>
            <Text fz={13} fw={600} lh={1} c="lake.4">
              ‹ Volver
            </Text>
          </UnstyledButton>
          <Text component="h2" className="display" fz={36} lh={1.02} style={{ letterSpacing: "-0.03em", margin: 0 }}>
            {hasRange ? (
              <>
                Reservar
                <br />
                estas fechas
              </>
            ) : (
              <>
                Consultar
                <br />
                {cabin.name.toLowerCase()}
              </>
            )}
          </Text>
          <Text fz={13.5} lh={1.6} c="pine.2" pt={11} pb={22}>
            Te confirmamos por WhatsApp. Todavía no se cobra nada.
          </Text>

          <Stack className="surface" gap={15} p={18}>
            <Row label="Cabaña">
              <Text className="display" fw={600} fz={19} lh={1.1} style={{ letterSpacing: "-0.02em" }}>
                {cabin.name}
              </Text>
            </Row>
            <Divider color="var(--hairline-light)" />
            <Row label="Fechas">
              <Text className="display" fw={600} fz={19} lh={1.2} ta="right" style={{ letterSpacing: "-0.02em" }}>
                {stayLabel}
              </Text>
            </Row>
            <Divider color="var(--hairline-light)" />
            <Row label="Personas">
              <Group gap={10} wrap="nowrap">
                <ActionIcon
                  variant="filled"
                  color="rgba(255,255,255,0.09)"
                  size={32}
                  radius="xl"
                  aria-label="Menos personas"
                  disabled={guests <= 1}
                  onClick={() => onGuestsChange(guests - 1)}
                  style={{ color: "var(--paper)" }}
                >
                  <IconMinus size={16} stroke={1.5} />
                </ActionIcon>
                <Text
                  className="display"
                  fw={600}
                  fz={19}
                  lh={1.1}
                  miw={24}
                  ta="center"
                  style={{ letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}
                >
                  {guests}
                </Text>
                <ActionIcon
                  variant="filled"
                  color="rgba(255,255,255,0.09)"
                  size={32}
                  radius="xl"
                  aria-label="Más personas"
                  disabled={guests >= cabin.max}
                  onClick={() => onGuestsChange(guests + 1)}
                  style={{ color: "var(--paper)" }}
                >
                  <IconPlus size={16} stroke={1.5} />
                </ActionIcon>
              </Group>
            </Row>
          </Stack>

          <Stack gap={10} pt={14}>
            <TextInput
              placeholder="Tu nombre"
              aria-label="Tu nombre"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              size="md"
              radius="md"
              styles={{ input: { ...inputStyles.input, height: 52 } }}
            />
            <Textarea
              placeholder="¿Algo que quieras contarnos? Llegamos tarde, venimos con chicos…"
              aria-label="Comentarios"
              value={note}
              onChange={(e) => setNote(e.currentTarget.value)}
              minRows={3}
              radius="md"
              styles={{ input: { ...inputStyles.input, height: 98, padding: "14px 16px", lineHeight: 1.5 } }}
            />
          </Stack>

          <Button
            component="a"
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="pill"
            color="lake"
            fullWidth
            mt={18}
            onClick={() => setSent(true)}
          >
            Enviar por WhatsApp
          </Button>
          <Text fz={12} lh={1.5} c="pine.2" ta="center" pt={11}>
            Se abre el chat con el mensaje ya escrito
          </Text>
        </Stack>
      )}
    </Modal>
  );
}
