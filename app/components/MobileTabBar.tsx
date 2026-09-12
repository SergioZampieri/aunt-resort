"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Text, UnstyledButton } from "@mantine/core";

const tabs = [
  { label: "Buscar", href: "/" },
  { label: "Predio", href: "/exteriores-piscina" },
  { label: "Promos", href: "/promociones" },
  { label: "Contacto", href: "/contactos" },
];

/** The finder, its results and every cabin page all belong to "Buscar". */
function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/" || pathname.startsWith("/cabanas") || pathname.startsWith("/cabana-");
  }
  return pathname.startsWith(href);
}

/**
 * App-style bottom navigation, phones only — the desktop header carries the
 * real nav. Frosted pine-night, a lantern bar over the active label.
 */
export function MobileTabBar() {
  const pathname = usePathname() ?? "/";

  return (
    <Box
      component="nav"
      hiddenFrom="sm"
      aria-label="Navegación principal"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 200,
        height: "var(--tab-bar-h)",
        display: "flex",
        padding: "13px 6px 0",
        backgroundColor: "rgba(12,31,26,0.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid var(--hairline-light)",
      }}
    >
      {tabs.map((tab) => {
        const active = isActive(pathname, tab.href);
        return (
          <UnstyledButton
            key={tab.href}
            component={Link}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              paddingTop: 4,
            }}
          >
            <Box
              style={{
                width: 22,
                height: 3,
                borderRadius: 2,
                backgroundColor: active ? "var(--lantern)" : "transparent",
              }}
            />
            <Text fz={11.5} fw={500} lh={1} c={active ? "#f7f3ea" : "pine.3"}>
              {tab.label}
            </Text>
          </UnstyledButton>
        );
      })}
    </Box>
  );
}
