import dayjs from "dayjs";
import { siteInfo } from "../data/site";

export const DEFAULT_MESSAGE =
  "Hola, quisiera consultar disponibilidad en Mirador de Animas.";

export function whatsappHref(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${siteInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function formatDate(date: Date | string): string {
  return dayjs(date).format("DD/MM/YYYY");
}

/**
 * Builds the WhatsApp text for an enquiry, folding in whichever of the cabin
 * name and the selected dates the visitor has actually chosen.
 */
export function bookingMessage(options: {
  cabinName?: string;
  from?: Date | string | null;
  to?: Date | string | null;
}): string {
  const { cabinName, from, to } = options;
  const subject = cabinName ? `la ${cabinName}` : "el complejo";

  if (from && to) {
    return `Hola, quisiera consultar disponibilidad en ${subject} del ${formatDate(from)} al ${formatDate(to)}.`;
  }

  if (from) {
    return `Hola, quisiera consultar disponibilidad en ${subject} a partir del ${formatDate(from)}.`;
  }

  return `Hola, quisiera consultar disponibilidad en ${subject}.`;
}
