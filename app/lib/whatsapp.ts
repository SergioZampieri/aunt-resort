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
  guests?: number | null;
  /** The guest's name, from the request form. */
  name?: string;
  note?: string;
}): string {
  const { cabinName, from, to, guests, name, note } = options;
  const subject = cabinName ? `la ${cabinName}` : "el complejo";
  const hello = name?.trim() ? `Hola, soy ${name.trim()}. Quisiera` : "Hola, quisiera";
  const forGuests = guests ? ` para ${guests} ${guests === 1 ? "persona" : "personas"}` : "";

  let message: string;
  if (from && to) {
    message = `${hello} consultar disponibilidad en ${subject} del ${formatDate(from)} al ${formatDate(to)}${forGuests}.`;
  } else if (from) {
    message = `${hello} consultar disponibilidad en ${subject} a partir del ${formatDate(from)}${forGuests}.`;
  } else {
    message = `${hello} consultar disponibilidad en ${subject}${forGuests}.`;
  }

  return note?.trim() ? `${message} ${note.trim()}` : message;
}
