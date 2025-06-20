import dayjs from "dayjs";

export const getGmtTime = () => {
  const offsetMinutes = dayjs().utcOffset();

  const hours = Math.floor(Math.abs(offsetMinutes) / 60);
  const minutes = Math.abs(offsetMinutes) % 60;
  const sign = offsetMinutes >= 0 ? "+" : "-";

  return `GMT ${sign}${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;
};

export const combineDateAndTime = (date: Date, time?: string): Date => {
  const result = new Date(date);
  if (!time || time === "00:00") {
    result.setHours(0, 0, 0, 0);
  } else {
    const [hours, minutes] = time.split(":").map(Number);
    result.setHours(hours, minutes, 0, 0);
  }
  return result;
};
