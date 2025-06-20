import { getToolbarDateLabel } from "@/domains/calendar/utils/getToolbarDateLabel";

describe("getToolbarDateLabel", () => {
  const start = new Date("2025-06-01T00:00:00");
  const end = new Date("2025-06-07T00:00:00");

  it("returns correct label for dayGridMonth", () => {
    expect(getToolbarDateLabel("dayGridMonth", start, end)).toMatch(
      /June 2025/
    );
  });

  it("returns correct label for timeGridWeek (same month)", () => {
    expect(getToolbarDateLabel("timeGridWeek", start, end)).toMatch(
      /June 2025/
    );
  });

  it("returns correct label for timeGridWeek (different months)", () => {
    const febEnd = new Date("2025-07-02T00:00:00");
    expect(getToolbarDateLabel("timeGridWeek", start, febEnd)).toMatch(
      /Jun - Jul 2025/
    );
  });

  it("returns correct label for timeGridDay", () => {
    expect(getToolbarDateLabel("timeGridDay", start, end)).toMatch(
      /June 1, 2025/
    );
  });
});
