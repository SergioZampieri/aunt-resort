"use client";

import { ActionIcon, Tooltip } from "@mantine/core";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { whatsappHref } from "../lib/whatsapp";

/**
 * Always-reachable enquiry button for tablet widths, where the header's
 * "Reservar" pill is hidden. Phones have the tab bar and in-page pills
 * instead; desktops have the header button.
 */
export function WhatsAppFab() {
  return (
    <Tooltip label="Consultar por WhatsApp" position="left" withArrow>
      <ActionIcon
        visibleFrom="sm"
        hiddenFrom="lg"
        component="a"
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consultar disponibilidad por WhatsApp"
        color="lake"
        radius="xl"
        size={56}
        style={{
          position: "fixed",
          right: "clamp(16px, 4vw, 28px)",
          bottom: "clamp(16px, 4vw, 28px)",
          zIndex: 300,
          boxShadow: "var(--mantine-shadow-lg)",
        }}
      >
        <IconBrandWhatsapp size={28} />
      </ActionIcon>
    </Tooltip>
  );
}
