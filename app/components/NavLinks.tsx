"use client";

import Link from "next/link";
import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  type ActionIconProps,
  type AnchorProps,
  type BoxProps,
  type ButtonProps,
} from "@mantine/core";

/**
 * Mantine components can't take `component={Link}` from a server component —
 * the function crosses the RSC boundary. These client wrappers do it instead.
 */

type LinkButtonProps = ButtonProps & {
  href: string;
  children: React.ReactNode;
};

export function LinkButton({ href, children, ...props }: LinkButtonProps) {
  return (
    <Button component={Link} href={href} {...props}>
      {children}
    </Button>
  );
}

type LinkAnchorProps = AnchorProps & {
  href: string;
  children: React.ReactNode;
};

export function LinkAnchor({ href, children, ...props }: LinkAnchorProps) {
  return (
    <Anchor component={Link} href={href} {...props}>
      {children}
    </Anchor>
  );
}

type LinkBoxProps = BoxProps & {
  href: string;
  children: React.ReactNode;
};

/** A whole block that behaves as one link (a card, a tile). */
export function LinkBox({ href, children, ...props }: LinkBoxProps) {
  return (
    <Box
      component={Link}
      href={href}
      style={{ display: "block", color: "inherit", textDecoration: "none" }}
      {...props}
    >
      {children}
    </Box>
  );
}

type LinkActionIconProps = ActionIconProps & {
  href: string;
  "aria-label": string;
  children: React.ReactNode;
};

/** An icon-only link (the round "back" button on a cabin page). */
export function LinkActionIcon({ href, children, ...props }: LinkActionIconProps) {
  return (
    <ActionIcon component={Link} href={href} {...props}>
      {children}
    </ActionIcon>
  );
}
