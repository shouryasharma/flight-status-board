export const formatDepartureTime = (timestampStr: string): string => {
  const timestampDate = new Date(timestampStr);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
    timeZoneName: "short",
  };
  return timestampDate.toLocaleString("en-US", options);
};