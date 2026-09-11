"use client";

import { useEffect, useRef, useState } from "react";
import { Box, type BoxProps } from "@mantine/core";

type RevealProps = BoxProps & {
  children: React.ReactNode;
  /** Stagger, in ms, so a row of cards arrives one after the other. */
  delay?: number;
};

/**
 * Fades content up the first time it scrolls into view.
 *
 * Content is visible by default: server HTML, pre-hydration paint and
 * no-JS all show it. Only after hydration, and only for blocks that are
 * still below the fold, is it hidden and handed to the observer, so a
 * slow phone never stares at an empty page. The CSS opts out entirely
 * under `prefers-reduced-motion`.
 */
export function Reveal({ children, delay = 0, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      return; // already on screen — never hide what the visitor is looking at
    }

    let revealed = false;
    const show = () => {
      if (!revealed) {
        revealed = true;
        setHidden(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -5% 0px" },
    );

    // Hide, then start watching. If the observer never fires (odd scroll
    // containers, in-app browsers), the timeout shows it anyway.
    const hide = window.setTimeout(() => setHidden(true), 0);
    observer.observe(node);
    const fallback = window.setTimeout(show, 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(hide);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <Box
      ref={ref}
      className="reveal"
      data-hidden={hidden || undefined}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Box>
  );
}
