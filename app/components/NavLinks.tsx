"use client";

import Link from "next/link";
import { Anchor, Box, Button, type AnchorProps, type BoxProps, type ButtonProps } from "@mantine/core";

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
