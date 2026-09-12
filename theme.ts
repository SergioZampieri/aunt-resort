"use client";

import { createTheme, type MantineColorsTuple } from "@mantine/core";

/**
 * Palette: "lake & deep pine" — a still lake at dusk seen from under the
 * trees, pitched deliberately dark. Pine is the structural base, lake teal
 * carries interaction, moss softens, oat is the paper, and lantern gold is
 * the one warm light in the frame.
 */

/** Deep pine — the brand base and the dark bands. */
const pine: MantineColorsTuple = [
  "#eaf2ee",
  "#d3e4dc",
  "#a9c9bd",
  "#7cac9c",
  "#588f7e",
  "#417a68",
  "#356b5a",
  "#28564a",
  "#1d4339",
  "#122b24",
];

/** Lake teal — links, primary actions, focus. */
const lake: MantineColorsTuple = [
  "#e6f4f3",
  "#cfe9e7",
  "#a0d4d0",
  "#6dbeb8",
  "#48aca4",
  "#329f96",
  "#249289",
  "#167d75",
  "#096a63",
  "#00524d",
];

/** Moss — the soft, grassy middle tone. */
const moss: MantineColorsTuple = [
  "#eff5e9",
  "#dfead4",
  "#bfd6ab",
  "#9ec17f",
  "#83b05c",
  "#72a547",
  "#68a03c",
  "#568b2e",
  "#4a7a26",
  "#3b661a",
];

/** Oat — paper, cards and the light bands. */
const oat: MantineColorsTuple = [
  "#fbf8f1",
  "#f2ece0",
  "#e9e0cd",
  "#ddd1b6",
  "#cec0a0",
  "#bcac89",
  "#a3946f",
  "#867a58",
  "#6a6044",
  "#4e4631",
];

/** Lantern gold — the single warm accent, used sparingly on the dark bands. */
const lantern: MantineColorsTuple = [
  "#fff7e3",
  "#fbeeca",
  "#f5da9b",
  "#efc668",
  "#eab53f",
  "#e7aa26",
  "#e5a419",
  "#ca8e0e",
  "#b47c06",
  "#9c6900",
];

/**
 * Mantine's dark scheme reads its greys from `dark`. Pitching those in pine
 * makes every input, popover, modal and calendar land on the app ground
 * (`dark.7` = pine-night) with paper text (`dark.0`) and no per-component
 * overrides: 6 is the surface (white at 5% on night), 4 the hairline.
 */
const dark: MantineColorsTuple = [
  "#f7f3ea",
  "#d3e4dc",
  "#a9c9bd",
  "#7cac9c",
  "#33433f",
  "#245044",
  "#182a26",
  "#0c1f1a",
  "#0a1a16",
  "#071310",
];

export const theme = createTheme({
  fontFamily: "var(--font-ui)",
  headings: {
    fontFamily: "var(--font-display)",
    fontWeight: "700",
    sizes: {
      h1: { fontSize: "var(--display)", lineHeight: "1.06" },
      h2: { fontSize: "var(--h2)", lineHeight: "1.14" },
      h3: { fontSize: "var(--h3)", lineHeight: "1.25" },
    },
  },
  primaryColor: "pine",
  primaryShade: { light: 8 },
  colors: {
    pine,
    lake,
    moss,
    oat,
    lantern,
    dark,
  },
  white: "#f7f3ea",
  black: "#1b2621",
  defaultRadius: "md",
  radius: {
    xs: "3px",
    sm: "6px",
    md: "10px",
    lg: "16px",
    xl: "26px",
  },
  shadows: {
    sm: "0 1px 3px rgba(12, 31, 26, 0.06), 0 6px 18px rgba(12, 31, 26, 0.05)",
    md: "0 2px 6px rgba(12, 31, 26, 0.06), 0 14px 36px rgba(12, 31, 26, 0.09)",
    lg: "0 4px 12px rgba(12, 31, 26, 0.07), 0 26px 60px rgba(12, 31, 26, 0.13)",
    xl: "0 6px 18px rgba(12, 31, 26, 0.08), 0 40px 84px rgba(12, 31, 26, 0.17)",
  },
  other: {
    creamBackground: "#F2ECE0",
  },
});
