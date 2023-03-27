export function dateToWeekdayDate(dateString: string): string {
  const date = new Date(dateString);
  const fomatObj = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  return fomatObj.format(date).toString();
}

export function dateToTime(dateString: string): string {
  const date = new Date(dateString);
  const fomatObj = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return fomatObj.format(date).toString();
}
