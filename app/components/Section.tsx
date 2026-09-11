import { Box, Container, Stack, Text, Title } from "@mantine/core";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  align?: "center" | "left";
  /** Light text for placement on the dark pine band. */
  inverted?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  inverted,
}: SectionHeadingProps) {
  return (
    <Reveal>
      <Stack
        gap="md"
        align={align === "center" ? "center" : "flex-start"}
        ta={align}
        maw={align === "center" ? 640 : 620}
        mx={align === "center" ? "auto" : undefined}
      >
        {eyebrow ? (
          <Text
            className={inverted ? "eyebrow ruled-light" : "eyebrow ruled"}
            c={inverted ? "lantern.4" : "lake.8"}
            w={align === "center" ? undefined : "100%"}
          >
            {eyebrow}
          </Text>
        ) : null}
        <Title order={2} c={inverted ? "white" : undefined} style={{ textWrap: "balance" }}>
          {title}
        </Title>
        {lead ? (
          <Text fz="lg" lh={1.75} c={inverted ? "oat.3" : "dimmed"}>
            {lead}
          </Text>
        ) : null}
      </Stack>
    </Reveal>
  );
}

type SectionProps = {
  children: React.ReactNode;
  tone?: "paper" | "deep" | "pine";
  id?: string;
};

const tones = {
  paper: "g-paper",
  deep: "g-paper-deep",
  pine: "g-pine grain",
} as const;

export function Section({ children, tone = "paper", id }: SectionProps) {
  return (
    <Box
      component="section"
      id={id}
      className={tones[tone]}
      style={{ position: "relative", paddingBlock: "var(--section-py)" }}
    >
      <Container size="lg" style={{ position: "relative", zIndex: 1 }}>
        {children}
      </Container>
    </Box>
  );
}
