"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Container, Group, Anchor } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { siteInfo } from "../data/site";
import { WhatsAppButton } from "./WhatsAppButton";

const navLinks = [
  { label: "Cabañas", href: "/cabanas" },
  { label: "Exteriores", href: "/exteriores-piscina" },
  { label: "Servicios", href: "/servicios" },
  { label: "Promociones", href: "/promociones" },
  { label: "Contacto", href: "/contactos" },
];

/** A cabin page belongs to the "Cabañas" section for highlighting purposes. */
function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  if (href === "/cabanas") {
    return pathname.startsWith("/cabanas") || pathname.startsWith("/cabana-");
  }
  return pathname.startsWith(href);
}

/**
 * Desktop and tablet only: phones navigate with `MobileTabBar` and carry the
 * logo mark inside the opening hero instead. Transparent over the hero, it
 * condenses to the paper bar with dark ink once the page scrolls.
 */
export function Header() {
  const pathname = usePathname() ?? "/";
  const [scroll] = useWindowScroll();
  const condensed = scroll.y > 24;

  return (
    <Box
      component="header"
      visibleFrom="sm"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        // No hard edge: the bar dissolves downwards into whatever is under it.
        backgroundImage: condensed
          ? "linear-gradient(to bottom, rgba(247,243,234,0.97) 0%, rgba(247,243,234,0.90) 48%, rgba(247,243,234,0.52) 80%, rgba(247,243,234,0) 100%)"
          : "linear-gradient(to bottom, rgba(12,31,26,0.82) 0%, rgba(12,31,26,0.48) 45%, rgba(12,31,26,0.14) 78%, rgba(12,31,26,0) 100%)",
        backdropFilter: condensed ? "blur(10px)" : undefined,
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.6) 84%, rgba(0,0,0,0) 100%)",
        maskImage:
          "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.6) 84%, rgba(0,0,0,0) 100%)",
        paddingBottom: 18,
        transition: "background-image 350ms ease, height 300ms ease",
      }}
    >
      <Container size="lg">
        <Group justify="space-between" h={condensed ? 68 : 84} wrap="nowrap" gap="sm" style={{ transition: "height 300ms ease" }}>
          <Anchor component={Link} href="/" underline="never" c="black">
            <Group gap={10} wrap="nowrap">
              <Image
                src={condensed ? "/images/logo/logo-mark.png" : "/images/logo/logo-mark-light.png"}
                alt={`${siteInfo.name} — inicio`}
                width={161}
                height={66}
                priority
                style={{
                  objectFit: "contain",
                  height: condensed ? 44 : 52,
                  width: "auto",
                  transition: "height 300ms ease",
                }}
              />
            </Group>
          </Anchor>

          <Group gap={22} wrap="nowrap">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Anchor
                  key={link.href}
                  component={Link}
                  href={link.href}
                  underline="never"
                  c={condensed ? "var(--ink)" : "white"}
                  fz={14}
                  fw={active ? 700 : 500}
                  aria-current={active ? "page" : undefined}
                  style={{
                    whiteSpace: "nowrap",
                    paddingBottom: 4,
                    textShadow: condensed ? undefined : "0 1px 8px rgba(0,0,0,0.35)",
                    transition: "color 300ms ease",
                    borderBottom: active
                      ? `2px solid var(--mantine-color-${condensed ? "lake-7" : "lantern-4"})`
                      : "2px solid transparent",
                  }}
                >
                  {link.label}
                </Anchor>
              );
            })}
          </Group>

          <Box visibleFrom="lg">
            <WhatsAppButton label="Reservar" size="sm" />
          </Box>
        </Group>
      </Container>
    </Box>
  );
}
