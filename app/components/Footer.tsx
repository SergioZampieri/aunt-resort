import { Box, Container, Divider, SimpleGrid, Stack, Text, Title, Anchor } from "@mantine/core";
import { IconBrandWhatsapp, IconMail, IconMapPin } from "@tabler/icons-react";
import { siteInfo } from "../data/site";
import { whatsappHref } from "../lib/whatsapp";
import { LinkAnchor } from "./NavLinks";

const footerLinks = [
  { label: "Cabañas", href: "/cabanas" },
  { label: "Exteriores y piscina", href: "/exteriores-piscina" },
  { label: "Servicios", href: "/servicios" },
  { label: "Promociones", href: "/promociones" },
];

export function Footer() {
  return (
    <Box
      component="footer"
      className="grain mobile-tab-bar-clearance"
      style={{
        position: "relative",
        paddingBlock: "clamp(3rem, 2rem + 3vw, 4.5rem)",
        backgroundImage:
          "radial-gradient(110% 70% at 10% 0%, rgba(36,146,137,0.26) 0%, rgba(36,146,137,0) 60%), linear-gradient(165deg, var(--pine) 0%, var(--pine-deep) 48%, var(--pine-night) 100%)",
      }}
    >
      <Container size="lg" style={{ position: "relative", zIndex: 1 }}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
          <Stack gap="xs">
            <Title order={2} c="white" fz={26} ff="var(--font-display)" lh={1.1}>
              {siteInfo.name}
            </Title>
            <Text className="eyebrow" c="lantern.3">
              Tandil · Buenos Aires
            </Text>
            <Text c="oat.2" fz="sm" lh={1.7} mt={4}>
              {siteInfo.tagline}
            </Text>
          </Stack>

          <Stack gap="xs">
            <Text className="eyebrow" c="white">
              El complejo
            </Text>
            {footerLinks.map((link) => (
              <LinkAnchor key={link.href} href={link.href} c="oat.2" fz="sm" underline="hover">
                {link.label}
              </LinkAnchor>
            ))}
          </Stack>

          <Stack gap="sm">
            <Text className="eyebrow" c="white">
              Contacto
            </Text>
            <Text c="oat.2" fz="sm" lh={1.6}>
              <IconMapPin size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
              {siteInfo.address}
            </Text>
            <Anchor href={`mailto:${siteInfo.email}`} c="oat.2" fz="sm" underline="hover">
              <IconMail size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
              {siteInfo.email}
            </Anchor>
            <Anchor
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              c="lantern.3"
              fz="sm"
              fw={600}
              underline="hover"
            >
              <IconBrandWhatsapp size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
              {siteInfo.phoneDisplay}
            </Anchor>
            <LinkAnchor href="/contactos" c="oat.2" fz="sm" underline="hover">
              Cómo llegar
            </LinkAnchor>
          </Stack>

          <Stack gap="xs">
            <Text className="eyebrow" c="white">
              Horarios
            </Text>
            <Text c="oat.2" fz="sm">
              Check-in: {siteInfo.checkIn}
            </Text>
            <Text c="oat.2" fz="sm">
              Check-out: {siteInfo.checkOut}
            </Text>
            <Text c="oat.2" fz="sm">
              No se admiten mascotas
            </Text>
            <LinkAnchor href="/cabanas" c="oat.2" fz="sm" underline="hover">
              Ver fechas libres
            </LinkAnchor>
          </Stack>
        </SimpleGrid>

        <Divider my="xl" color="rgba(255,255,255,0.14)" />

        <Text c="oat.4" fz="xs" ta="center">
          © {new Date().getFullYear()} {siteInfo.name} · Tandil, Buenos Aires
        </Text>
      </Container>
    </Box>
  );
}
