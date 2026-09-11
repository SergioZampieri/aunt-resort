import { Card, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconCalendarSearch, IconTag } from "@tabler/icons-react";
import { PageHeader } from "../components/PageHeader";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { LinkButton } from "../components/NavLinks";
import { Reveal } from "../components/Reveal";
import { Section, SectionHeading } from "../components/Section";
import { promotions } from "../data/site";

export const metadata = {
  title: "Promociones | Mirador de Animas",
  description: "Consultá por promociones de temporada y beneficios para estadías prolongadas.",
};

export default function PromocionesPage() {
  return (
    <>
      <PageHeader
        title="Promociones"
        eyebrow="Beneficios"
        image="/images/sections/promociones.jpg"
        imageAlt="Galería exterior de una cabaña al atardecer"
        subtitle="Tarifas especiales de temporada y beneficios para quedarse unos días más."
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="Escribinos"
          title="Armamos el presupuesto con vos"
          lead="Contanos cuántos son y qué fechas mirás, y te pasamos la tarifa que te corresponda."
        />

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mt={{ base: 40, md: 56 }}>
          {promotions.map((promo, index) => (
            <Reveal key={promo.title} delay={index * 120}>
              <Card
                p="xl"
                radius="md"
                shadow="sm"
                className="g-card"
                style={{ height: "100%", border: "1px solid var(--hairline)" }}
              >
                <Stack gap="sm">
                  <Group gap={8} c="lake.8">
                    <IconTag size={18} />
                    <Text className="eyebrow">Promoción</Text>
                  </Group>
                  <Text ff="var(--font-abhaya-libre)" fw={700} fz="var(--h3)" lh={1.2}>
                    {promo.title}
                  </Text>
                  <Text c="dimmed" lh={1.75}>
                    {promo.description}
                  </Text>
                </Stack>
              </Card>
            </Reveal>
          ))}
        </SimpleGrid>

        <Reveal delay={220}>
          <Group gap="sm" justify="center" mt={48}>
            <LinkButton
              href="/cabanas"
              size="md"
              radius="xl"
              color="lake"
              leftSection={<IconCalendarSearch size={18} />}
            >
              Ver fechas disponibles
            </LinkButton>
            <WhatsAppButton
              message="Hola, quisiera consultar por promociones y disponibilidad."
              label="Consultar promociones"
              variant="outline"
            />
          </Group>
        </Reveal>
      </Section>
    </>
  );
}
