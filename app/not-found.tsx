import { Box, Container, Group, Stack, Text, Title } from "@mantine/core";
import { LinkButton } from "./components/NavLinks";
import { WhatsAppButton } from "./components/WhatsAppButton";

export const metadata = {
  title: "Página no encontrada | Mirador de Animas",
};

export default function NotFound() {
  return (
    <Box className="g-pine grain" style={{ position: "relative", overflow: "hidden" }}>
      <Container
        size="sm"
        style={{ position: "relative", zIndex: 1 }}
        pt={{ base: 140, sm: 180 }}
        pb={{ base: 80, sm: 140 }}
      >
        <Stack gap="lg" align="center" ta="center">
          <Text className="eyebrow" c="lantern.4">
            Error 404
          </Text>
          <Title order={1} c="white" style={{ textWrap: "balance" }}>
            No encontramos esta página
          </Title>
          <Text c="oat.3" fz="lg" lh={1.75} maw={520}>
            Puede que el enlace esté viejo. Volvé al inicio o mirá qué cabañas quedan libres.
          </Text>
          <Group gap="sm" justify="center" mt="xs">
            <LinkButton href="/" color="lake" radius="xl" size="md">
              Volver al inicio
            </LinkButton>
            <LinkButton href="/cabanas" variant="white" radius="xl" size="md">
              Ver cabañas
            </LinkButton>
          </Group>
          <WhatsAppButton size="sm" variant="subtle" color="oat" />
        </Stack>
      </Container>
    </Box>
  );
}
