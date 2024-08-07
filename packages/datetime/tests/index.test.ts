import DateTime, { DatePair } from "../src/index";

describe("DateTime Class", () => {
  const testDate1_String = "2021-04-07T16:31:15.177Z";
  const testDate2_String = "2021-04-08T02:21:15.677Z";
  const testDate1 = DateTime.fromString(testDate1_String).DateTime.toUTC(); // Convert to UTC
  const testDate2 = DateTime.fromString(testDate2_String).DateTime.toUTC(); // Convert to UTC

  test("should create DateTime instance from ISO string", () => {
    expect(testDate1.toISO()).toBe("2021-04-07T16:31:15.177Z");
    expect(testDate2.toISO()).toBe("2021-04-08T02:21:15.677Z");
  });

  test("should return null for invalid date string", () => {
    const invalidDate = DateTime.fromString("invalid-date");
    expect(invalidDate.isValid()).toBe(false);
  });

  test("should format DateTime with different formats", () => {
    expect(
      DateTime.fromLuxonDateTime(testDate1).getFormattedStringWithHyphen()
    ).toBe("2021-04-07 16:31:15");
    expect(
      DateTime.fromLuxonDateTime(testDate1).getFormattedStringWithSlash()
    ).toBe("2021/04/07 16:31");
    expect(DateTime.fromLuxonDateTime(testDate1).getDateOnlyWithHyphen()).toBe(
      "2021-04-07"
    );
    expect(DateTime.fromLuxonDateTime(testDate1).getDateOnlyWithSlash()).toBe(
      "2021/04/07"
    );
    expect(DateTime.fromLuxonDateTime(testDate1).getTimeOnly()).toBe("16:31");
  });

  test("should add minutes to DateTime", () => {
    const newDate = DateTime.fromLuxonDateTime(testDate1)
      .addMinutes(10)
      .DateTime.toUTC();
    expect(newDate.toISO()).toBe("2021-04-07T16:41:15.177Z");
  });

  test("should compare two DateTime objects", () => {
    const isoDate1 = testDate1.toISO();
    const isoDate2 = testDate2.toISO();

    if (isoDate1 && isoDate2) {
      expect(DateTime.isEqual(isoDate1, isoDate2)).toBe(false);
      expect(DateTime.isEqual(isoDate1, isoDate1)).toBe(true);
    }
  });

  test("should compare two DateTime strings", () => {
    expect(DateTime.isEqual(testDate1_String, testDate2_String)).toBe(false);
    expect(DateTime.isEqual(testDate1_String, testDate1_String)).toBe(true);
  });

  test("should calculate age based on birth date", () => {
    const birthDateString = "2000-04-07T16:31:15.177Z";
    const now = DateTime.fromString("2024-04-07T16:31:15.177Z");
    expect(DateTime.getUserAgeFromNow(birthDateString, now)).toBe("24");
  });

  test("should handle DatePair operations", () => {
    const datePair: DatePair[] = [
      {
        start: DateTime.fromString("2021-04-07T12:21:15.577Z"),
        end: DateTime.fromString("2021-04-07T13:21:15.677Z"),
      },
      {
        start: DateTime.fromString("2021-04-07T14:21:15.577Z"),
        end: DateTime.fromString("2021-04-07T15:21:15.677Z"),
      },
    ];

    const selectDatePair: DatePair = {
      start: DateTime.fromString("2021-04-07T16:21:15.477Z"),
      end: DateTime.fromString("2021-04-07T17:21:15.477Z"),
    };

    expect(DateTime.isOverlapping(datePair, selectDatePair)).toBe(true);
  });

  test("should correctly handle addMonths, addDays, and clone methods", () => {
    const originalDate = DateTime.fromString(
      "2021-04-07T16:31:15.177Z"
    ).DateTime.toUTC();
    const addedMonths = DateTime.fromLuxonDateTime(originalDate)
      .addMonths(1)
      .DateTime.toUTC();
    const addedDays = DateTime.fromLuxonDateTime(originalDate)
      .addDays(1)
      .DateTime.toUTC();
    const clonedDate = DateTime.fromLuxonDateTime(originalDate)
      .clone()
      .DateTime.toUTC();

    expect(addedMonths.toISO()).toBe("2021-05-07T16:31:15.177Z");
    expect(addedDays.toISO()).toBe("2021-04-08T16:31:15.177Z");
    expect(clonedDate.toISO()).toBe("2021-04-07T16:31:15.177Z");
  });

  test("should return tomorrow's date", () => {
    const tomorrow = DateTime.fromLuxonDateTime(testDate1)
      .getTomorrow()
      .DateTime.toUTC();
    expect(tomorrow.toISO()).toBe("2021-04-08T16:31:15.177Z");
  });

  test("should correctly validate ISO date strings", () => {
    expect(DateTime.isValidISODateTimeString("2021-04-07T16:31:15.177Z")).toBe(
      true
    );
    expect(DateTime.isValidISODateTimeString("invalid-date-string")).toBe(
      false
    );
  });

  test("should convert to UTC string", () => {
    expect(DateTime.fromLuxonDateTime(testDate1).toUTCString()).toBe(
      "2021-04-07T16:31:15.177Z"
    );
  });
});
