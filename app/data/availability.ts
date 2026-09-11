/**
 * Manual availability config.
 *
 * To block dates for a cabin (confirmed booking, maintenance, etc.), add a
 * range below. Dates are inclusive, in "YYYY-MM-DD" format, and `to` is the
 * checkout day (the night before `to` is the last occupied night).
 *
 * Example:
 *   { cabinId: "uno", from: "2026-01-10", to: "2026-01-15", label: "Reservado" }
 */
export type BookedRange = {
  cabinId: string;
  from: string;
  to: string;
  label?: string;
};

export const bookedRanges: BookedRange[] = [
  { cabinId: "uno", from: "2026-07-15", to: "2026-07-20", label: "Reservado" },
  { cabinId: "dos", from: "2026-07-18", to: "2026-07-22", label: "Reservado" },
  { cabinId: "tres", from: "2026-08-01", to: "2026-08-05", label: "Reservado" },
  { cabinId: "cinco", from: "2026-07-25", to: "2026-07-31", label: "Reservado" },
  { cabinId: "seis", from: "2026-07-10", to: "2026-07-14", label: "Mantenimiento" },
];
