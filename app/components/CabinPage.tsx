import {
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  Paper,
  Stack,
  Title,
  Text,
  List,
  ListItem,
  ThemeIcon,
  Badge,
} from "@mantine/core";
import { IconArrowLeft, IconCheck, IconClock, IconUsers } from "@tabler/icons-react";
import { type Cabin, getCabinImages } from "../data/cabins";
import { siteInfo } from "../data/site";
import { bookingMessage } from "../lib/whatsapp";
import { LinkAnchor } from "./NavLinks";
import { PageHeader } from "./PageHeader";
import { CabinGallery } from "./CabinGallery";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
import { WhatsAppButton } from "./WhatsAppButton";

type CabinPageProps = {
  cabin: Cabin;
};

export function CabinPage({ cabin }: CabinPageProps) {
  const images = getCabinImages(cabin);

  return (
    <>
      <PageHeader
        title={cabin.name}
        image={cabin.sectionImage}
        imageAlt={`Vista exterior de la ${cabin.name}`}
        subtitle={cabin.shortDescription}
      />
      <Container size="lg" py={{ base: 36, sm: 64 }}>
        <LinkAnchor
          href="/cabanas"
          c="lake.8"
          fz="sm"
          fw={500}
          underline="hover"
          mb="lg"
          display="inline-block"
        >
          <Group gap={6} wrap="nowrap">
            <IconArrowLeft size={15} />
            Volver a todas las cabañas
          </Group>
        </LinkAnchor>

        <Grid gap={{ base: "lg", md: 40 }}>
          <GridCol span={{ base: 12, md: 7 }}>
            <CabinGallery images={images} alt={`${cabin.name} — Mirador de Animas`} />
          </GridCol>

          <GridCol span={{ base: 12, md: 5 }}>
            <Paper
              p="xl"
              radius="md"
              shadow="sm"
              className="g-card"
              style={{
                position: "sticky",
                top: 96,
                border: "1px solid var(--hairline)",
              }}
            >
              <Stack gap="md">
                <Group gap="xs">
                  <Badge
                    color="moss"
                    variant="light"
                    size="lg"
                    leftSection={<IconUsers size={14} />}
                  >
                    {cabin.capacity}
                  </Badge>
                  <Badge
                    color="oat"
                    variant="light"
                    size="lg"
                    leftSection={<IconClock size={14} />}
                  >
                    Check-in {siteInfo.checkIn}
                  </Badge>
                </Group>

                <Text>{cabin.shortDescription}</Text>

                <WhatsAppButton
                  message={bookingMessage({ cabinName: cabin.name })}
                  label="Consultar esta cabaña"
                  size="md"
                  fullWidth
                />

                <Divider my={4} />

                <Title order={3} ff="var(--font-abhaya-libre)" fz="xl">
                  Comodidades
                </Title>
                <List
                  spacing="xs"
                  fz="sm"
                  icon={
                    <ThemeIcon color="lake" variant="light" size={22} radius="xl">
                      <IconCheck size={13} stroke={2.2} />
                    </ThemeIcon>
                  }
                >
                  {cabin.amenities.map((amenity) => (
                    <ListItem key={amenity}>{amenity}</ListItem>
                  ))}
                </List>
              </Stack>
            </Paper>
          </GridCol>
        </Grid>

        <Stack gap="sm" mt={{ base: 48, sm: 72 }}>
          <Title order={2} ff="var(--font-abhaya-libre)">
            Disponibilidad
          </Title>
          <Text c="dimmed" fz="sm" maw={620}>
            Fechas libres y ocupadas para {cabin.name}. Para reservar, escribinos por WhatsApp.
            ¿Querés comparar las seis cabañas de una vez?{" "}
            <LinkAnchor href="/cabanas" c="pine.8">
              Buscá por fechas acá
            </LinkAnchor>
            .
          </Text>
          <AvailabilityCalendar cabinId={cabin.id} cabinName={cabin.name} />
        </Stack>
      </Container>
    </>
  );
}
