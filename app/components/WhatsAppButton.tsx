import { Button } from "@mantine/core";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { DEFAULT_MESSAGE, whatsappHref } from "../lib/whatsapp";

type WhatsAppButtonProps = {
  message?: string;
  label?: string;
  size?: string;
  variant?: string;
  color?: string;
  fullWidth?: boolean;
};

export function WhatsAppButton({
  message = DEFAULT_MESSAGE,
  label = "Consultar por WhatsApp",
  size = "md",
  variant,
  color = "lake",
  fullWidth,
}: WhatsAppButtonProps) {
  return (
    <Button
      component="a"
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      leftSection={<IconBrandWhatsapp size={20} />}
      color={color}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      radius="xl"
    >
      {label}
    </Button>
  );
}
