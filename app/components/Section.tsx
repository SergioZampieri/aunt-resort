import { Box, Container, Stack, Text, Title } from "@mantine/core";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  align?: "center" | "left";
};

export function SectionHeading({ eyebrow, title, lead, align = "left" }: SectionHeadingProps) {
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
            className={align === "center" ? "eyebrow" : "eyebrow ruled-light"}
            c="pine.3"
            w={align === "center" ? undefined : "100%"}
          >
            {eyebrow}
          </Text>
        ) : null}
        <Title order={2} c="white" style={{ textWrap: "balance", letterSpacing: "-0.035em" }}>
          {title}
        </Title>
        {lead ? (
          <Text fz="md" lh={1.7} c="pine.1">
            {lead}
          </Text>
        ) : null}
      </Stack>
    </Reveal>
  );
}

type SectionProps = {
  children: React.ReactNode;
  tone?: "night" | "pine";
  id?: string;
};

const tones = {
  night: "g-night",
  pine: "g-pine grain",
} as const;

/** A band on the app ground with the shared gutter (`Container size="lg"`). */
export function Section({ children, tone = "night", id }: SectionProps) {
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
