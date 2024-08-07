import { DateTime as LuxonDateTime, Interval } from "luxon";
export declare enum DateFormat {
    fullDateTimeWithHyphen = "yyyy-MM-dd HH:mm:ss",
    fullDateTimeWithDot = "yyyy.MM.dd HH:mm",
    fullDateTimeWithSlash = "yyyy/MM/dd HH:mm",
    fullDateTimeWithSlashUntilSeconds = "yyyy/MM/dd HH:mm:ss",
    fullDateTimeWithoutSeparator = "yyyyMMddHHmmss",
    fullDateTimeWithDay = "yyyy/MM/dd(ccc) HH:mm",
    fullDateWithSlash = "yyyy/MM/dd",
    fullDateWithSlashAndDay = "yyyy/MM/dd(ccc)",
    fullJpDate = "yyyy\u5E74MM\u6708dd\u65E5",
    fullJpDateWithDay = "yyyy\u5E74MM\u6708dd\u65E5(ccc)",
    fullDateWithHyphen = "yyyy-MM-dd",
    fullYearMonthWithHyphen = "yyyy-MM",
    fullYearDateWithHyphen = "yyyy-dd",
    fullYearMonthWithSlash = "yyyy/MM",
    fullYearHalfMonthWithSlash = "yyyy/M",
    fullJpYearMonthWithSlash = "yyyy\u5E74MM\u6708",
    fullYear = "yyyy",
    fullJpYear = "yyyy\u5E74",
    fullMonthDateWithHyphen = "MM-dd",
    fullMonthDateWithSlashAndDay = "MM/dd(ccc)",
    fullJpMonthDateWithSlashAndDay = "MM\u6708dd\u65E5(ccc)",
    fullMonth = "MM",
    fullDate = "dd",
    fullYearMonthTime = "yyyy-MM HH:mm:ss",
    fullYearDayTime = "yyyy-dd HH:mm:ss",
    fullYearTime = "yyyy HH:mm:ss",
    fullMonthDayTime = "MM-dd HH:mm:ss",
    fullMonthTime = "MM HH:mm:ss",
    fullDayTime = "dd HH:mm:ss",
    fullTime = "HH:mm:ss",
    timeWithoutSeconds = "HH:mm",
    halfTimeWithoutSeconds = "H:mm",
    dayInWeek = "ccc",
    durationYears = "Y years",
    durationMonths = "M months",
    durationYearMonth = "yYM",
    durationJpYear = "y\u5E74",
    durationJpMonth = "M\u30F6\u6708",
    durationJpYearMonth = "y\u5E74M\u30F6\u6708",
    fullDateWithSlashForMoment = "YYYY-MM-DD",
    fullJpYearMonthWithSlashForMoment = "YYYY\u5E74MM\u6708",
    fullMonthDateWithSlash = "MM/dd"
}
export declare class DateTime {
    static Holidays: DateTime[];
    private readonly _luxonDateTime;
    constructor(luxonDateTime: LuxonDateTime);
    get DateTime(): LuxonDateTime;
    static fromString(dateString: string, isAPI?: boolean): DateTime;
    static fromLuxonDateTime(luxonDateTime: LuxonDateTime): DateTime;
    getFormattedStringWithHyphen(): string;
    getFormattedStringWithSlash(): string;
    getDateOnlyWithHyphen(): string;
    getDateOnlyWithSlash(): string;
    getTimeOnly(): string;
    toStringFormat(opt: string): string;
    toUTCString(): string;
    isValid(): boolean;
    static now(): DateTime;
    getTomorrow(): DateTime;
    addMinutes(minutes: number): DateTime;
    static fromUTCString(dateString: string): DateTime;
    equals(date: string | DateTime): boolean | null;
    static isEqual(date1: string | DateTime, date2: string | DateTime): boolean | null;
    compare(date: string | DateTime): boolean | null;
    static compareDates(date1: string | DateTime, date2: string | DateTime): boolean | null;
    static hasValidDates(dates: PartialDatePair): dates is DatePair;
    isOverlapping(datePair: DatePair[]): boolean;
    static isOverlapping(datePair: DatePair[], selectedDatePair: DatePair): boolean | null;
    static toIntervals(datePair: DatePair[]): Interval[];
    getUserAge(): string | null;
    static getUserAgeFromNow(dateString: string, now: DateTime): string | null;
    static getUserAge(dateString: string): string | null;
    addMonths(months: number): DateTime;
    addDays(days: number): DateTime;
    addHours(hours: number): DateTime;
    getDateWithZeroTime(): DateTime;
    clone(): DateTime;
    static isValidISODateTimeString(dateString: string): boolean;
}
declare global {
    interface String {
        toCustomDateTime(): DateTime;
    }
}
export type DatePair = {
    start: DateTime;
    end: DateTime;
};
export type PartialDatePair = Partial<DatePair>;
export default DateTime;
