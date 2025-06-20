import { getGmtTime, combineDateAndTime } from "@/domains/calendar/utils/date";

describe("getGmtTime", () => {
  it("returns GMT offset in correct format", () => {
    const result = getGmtTime();
    expect(result).toMatch(/^GMT [+-]\d{2}:\d{2}$/);
  });
});

describe("combineDateAndTime", () => {
  it("returns date at midnight if no time is provided", () => {
    const date = new Date("2025-06-01T10:30:00");
    const result = combineDateAndTime(date);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
  });

  it("returns date at midnight if time is '00:00'", () => {
    const date = new Date("2025-06-01T10:30:00");
    const result = combineDateAndTime(date, "00:00");
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
  });

  it("sets the correct hours and minutes when time is provided", () => {
    const date = new Date("2025-06-01T00:00:00");
    const result = combineDateAndTime(date, "14:45");
    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(45);
  });

  it("handles single-digit hours and minutes", () => {
    const date = new Date("2025-06-01T00:00:00");
    const result = combineDateAndTime(date, "3:7");
    expect(result.getHours()).toBe(3);
    expect(result.getMinutes()).toBe(7);
  });
});
