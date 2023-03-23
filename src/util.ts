import { WORKOUT_TYPE } from "./types";

export function enumToTitleCase(enumValue: WORKOUT_TYPE): string {
  let result = enumValue.toString().replaceAll("_", " ").toLowerCase();
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return result;
}

export function dateToWeekdayDate(dateString: string): string {
  const date = new Date(dateString);
  const weekdayFormat = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  return weekdayFormat.format(date).toString();
}

export function dateToTime(dateString: string): string {
  const date = new Date(dateString);
  const weekdayFormat = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return weekdayFormat.format(date).toString();
}
