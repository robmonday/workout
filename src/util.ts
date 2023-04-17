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

export function setLocalDTString(date: Date | undefined): string | undefined {
  if (date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, -8);
  }
  return undefined;
}
