import {
  isEventAllDayByTime,
  convertEventsRawToCalendar,
} from "@/domains/calendar/utils/events";

describe("isEventAllDayByTime", () => {
  it("returns true for all-day event (midnight to midnight, same day)", () => {
    const start = new Date("2025-06-01T00:00:00");
    const end = new Date("2025-06-01T00:00:00");
    expect(isEventAllDayByTime(start, end)).toBe(true);
  });

  it("returns true for multi-day event longer than 24h", () => {
    const start = new Date("2025-06-01T00:00:00");
    const end = new Date("2025-06-02T00:00:00");
    expect(isEventAllDayByTime(start, end)).toBe(true);
  });

  it("returns false for event not all day", () => {
    const start = new Date("2025-06-01T10:00:00");
    const end = new Date("2025-06-01T12:00:00");
    expect(isEventAllDayByTime(start, end)).toBe(false);
  });

  it("returns false for multi-day event less than 24h", () => {
    const start = new Date("2025-06-01T23:00:00");
    const end = new Date("2025-06-02T10:00:00");
    expect(isEventAllDayByTime(start, end)).toBe(false);
  });
});

describe("convertEventsRawToCalendar", () => {
  it("converts raw events to calendar events", () => {
    const rawEvents = [
      {
        id: "1",
        title: "Test Event",
        startDate: "2025-06-01T10:00:00Z",
        endDate: "2025-06-01T12:00:00Z",
        isAllDay: false,
        description: "desc",
      },
    ];
    const result = convertEventsRawToCalendar(rawEvents);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: "1",
      title: "Test Event",
      allDay: false,
      extendedProps: {
        description: "desc",
        originalStartDate: "2025-06-01T10:00:00.000Z",
        originalEndDate: "2025-06-01T12:00:00.000Z",
      },
    });
  });

  it("handles missing description", () => {
    const rawEvents = [
      {
        id: "2",
        title: "No Desc",
        startDate: "2025-06-01T10:00:00Z",
        endDate: "2025-06-01T12:00:00Z",
        isAllDay: true,
      },
    ];
    const result = convertEventsRawToCalendar(rawEvents);
    expect(result[0].extendedProps.description).toBe("");
  });
});
