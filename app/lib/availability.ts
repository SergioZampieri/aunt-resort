import dayjs from "dayjs";
import { bookedRanges, type BookedRange } from "../data/availability";

/** Either a `Date` or a "YYYY-MM-DD" string, as Mantine's pickers hand back. */
export type DateLike = Date | string;

export function getRangesForCabin(cabinId: string): BookedRange[] {
  return bookedRanges.filter((range) => range.cabinId === cabinId);
}

function findRange(cabinId: string, date: DateLike): BookedRange | undefined {
  const day = dayjs(date);
  return getRangesForCabin(cabinId).find(
    (range) =>
      (day.isAfter(range.from, "day") || day.isSame(range.from, "day")) &&
      day.isBefore(range.to, "day"),
  );
}

export function isDateBooked(cabinId: string, date: DateLike): boolean {
  return findRange(cabinId, date) !== undefined;
}

export function labelForDate(cabinId: string, date: DateLike): string | undefined {
  return findRange(cabinId, date)?.label;
}

/**
 * True when every night from `from` up to (but not including) the `to`
 * checkout day is free for this cabin.
 */
export function isCabinFullyAvailable(cabinId: string, from: DateLike, to: DateLike): boolean {
  let cursor = dayjs(from);
  const end = dayjs(to);

  // A same-day "range" still means one night.
  if (!end.isAfter(cursor, "day")) {
    return !isDateBooked(cabinId, cursor.toDate());
  }

  while (cursor.isBefore(end, "day")) {
    if (isDateBooked(cabinId, cursor.toDate())) {
      return false;
    }
    cursor = cursor.add(1, "day");
  }

  return true;
}

export function anyCabinAvailable(cabinIds: string[], date: DateLike): boolean {
  return cabinIds.some((id) => !isDateBooked(id, date));
}

/** Number of nights between check-in and checkout, at least 1. */
export function nightsBetween(from: DateLike, to: DateLike): number {
  return Math.max(1, dayjs(to).diff(dayjs(from), "day"));
}
