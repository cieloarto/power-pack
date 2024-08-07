"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = exports.DateFormat = void 0;
const luxon_1 = require("luxon");
var DateFormat;
(function (DateFormat) {
    DateFormat["fullDateTimeWithHyphen"] = "yyyy-MM-dd HH:mm:ss";
    DateFormat["fullDateTimeWithDot"] = "yyyy.MM.dd HH:mm";
    DateFormat["fullDateTimeWithSlash"] = "yyyy/MM/dd HH:mm";
    DateFormat["fullDateTimeWithSlashUntilSeconds"] = "yyyy/MM/dd HH:mm:ss";
    DateFormat["fullDateTimeWithoutSeparator"] = "yyyyMMddHHmmss";
    DateFormat["fullDateTimeWithDay"] = "yyyy/MM/dd(ccc) HH:mm";
    DateFormat["fullDateWithSlash"] = "yyyy/MM/dd";
    DateFormat["fullDateWithSlashAndDay"] = "yyyy/MM/dd(ccc)";
    DateFormat["fullJpDate"] = "yyyy\u5E74MM\u6708dd\u65E5";
    DateFormat["fullJpDateWithDay"] = "yyyy\u5E74MM\u6708dd\u65E5(ccc)";
    DateFormat["fullDateWithHyphen"] = "yyyy-MM-dd";
    DateFormat["fullYearMonthWithHyphen"] = "yyyy-MM";
    DateFormat["fullYearDateWithHyphen"] = "yyyy-dd";
    DateFormat["fullYearMonthWithSlash"] = "yyyy/MM";
    DateFormat["fullYearHalfMonthWithSlash"] = "yyyy/M";
    DateFormat["fullJpYearMonthWithSlash"] = "yyyy\u5E74MM\u6708";
    DateFormat["fullYear"] = "yyyy";
    DateFormat["fullJpYear"] = "yyyy\u5E74";
    DateFormat["fullMonthDateWithHyphen"] = "MM-dd";
    DateFormat["fullMonthDateWithSlashAndDay"] = "MM/dd(ccc)";
    DateFormat["fullJpMonthDateWithSlashAndDay"] = "MM\u6708dd\u65E5(ccc)";
    DateFormat["fullMonth"] = "MM";
    DateFormat["fullDate"] = "dd";
    DateFormat["fullYearMonthTime"] = "yyyy-MM HH:mm:ss";
    DateFormat["fullYearDayTime"] = "yyyy-dd HH:mm:ss";
    DateFormat["fullYearTime"] = "yyyy HH:mm:ss";
    DateFormat["fullMonthDayTime"] = "MM-dd HH:mm:ss";
    DateFormat["fullMonthTime"] = "MM HH:mm:ss";
    DateFormat["fullDayTime"] = "dd HH:mm:ss";
    DateFormat["fullTime"] = "HH:mm:ss";
    DateFormat["timeWithoutSeconds"] = "HH:mm";
    DateFormat["halfTimeWithoutSeconds"] = "H:mm";
    DateFormat["dayInWeek"] = "ccc";
    DateFormat["durationYears"] = "Y years";
    DateFormat["durationMonths"] = "M months";
    DateFormat["durationYearMonth"] = "yYM";
    DateFormat["durationJpYear"] = "y\u5E74";
    DateFormat["durationJpMonth"] = "M\u30F6\u6708";
    DateFormat["durationJpYearMonth"] = "y\u5E74M\u30F6\u6708";
    DateFormat["fullDateWithSlashForMoment"] = "YYYY-MM-DD";
    DateFormat["fullJpYearMonthWithSlashForMoment"] = "YYYY\u5E74MM\u6708";
    DateFormat["fullMonthDateWithSlash"] = "MM/dd";
})(DateFormat || (exports.DateFormat = DateFormat = {}));
class DateTime {
    constructor(luxonDateTime) {
        this._luxonDateTime = luxonDateTime;
    }
    get DateTime() {
        return this._luxonDateTime;
    }
    static fromString(dateString, isAPI = false) {
        const convertedDateString = dateString.replace(/^([0-9]{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])(.*)/, "$1-$2-$3$4");
        let dateTime = luxon_1.DateTime.fromISO(convertedDateString);
        if (isAPI) {
            dateTime = dateTime.plus({ hours: -9 });
        }
        return DateTime.fromLuxonDateTime(dateTime);
    }
    static fromLuxonDateTime(luxonDateTime) {
        return new DateTime(luxonDateTime);
    }
    getFormattedStringWithHyphen() {
        return this._luxonDateTime.toFormat(DateFormat.fullDateTimeWithHyphen);
    }
    getFormattedStringWithSlash() {
        return this._luxonDateTime.toFormat(DateFormat.fullDateTimeWithSlash);
    }
    getDateOnlyWithHyphen() {
        return this._luxonDateTime.toFormat(DateFormat.fullDateWithHyphen);
    }
    getDateOnlyWithSlash() {
        return this._luxonDateTime.toFormat(DateFormat.fullDateWithSlash);
    }
    getTimeOnly() {
        return this._luxonDateTime.toFormat(DateFormat.timeWithoutSeconds);
    }
    toStringFormat(opt) {
        return this._luxonDateTime.toFormat(opt);
    }
    toUTCString() {
        return this._luxonDateTime.toUTC().toString();
    }
    isValid() {
        return this._luxonDateTime.isValid;
    }
    static now() {
        return DateTime.fromLuxonDateTime(luxon_1.DateTime.local());
    }
    getTomorrow() {
        return this.addDays(1);
    }
    addMinutes(minutes) {
        return DateTime.fromLuxonDateTime(this._luxonDateTime.plus({ minutes }));
    }
    static fromUTCString(dateString) {
        return DateTime.fromString(dateString);
    }
    equals(date) {
        if (typeof date === "string") {
            const dateObject = luxon_1.DateTime.fromISO(date);
            if (!dateObject.isValid)
                return null;
            return this._luxonDateTime.equals(dateObject);
        }
        else {
            return this._luxonDateTime.equals(date.DateTime);
        }
    }
    static isEqual(date1, date2) {
        if (typeof date1 === "string" && typeof date2 === "string") {
            const dateObject1 = luxon_1.DateTime.fromISO(date1);
            const dateObject2 = luxon_1.DateTime.fromISO(date2);
            if (!dateObject1.isValid || !dateObject2.isValid)
                return null;
            return dateObject1.equals(dateObject2);
        }
        else if (date1 instanceof DateTime && date2 instanceof DateTime) {
            return date1.DateTime.equals(date2.DateTime);
        }
        return null;
    }
    compare(date) {
        if (typeof date === "string") {
            const dateObject = luxon_1.DateTime.fromISO(date);
            if (!dateObject.isValid)
                return null;
            return this._luxonDateTime < dateObject;
        }
        else {
            return this._luxonDateTime < date.DateTime;
        }
    }
    static compareDates(date1, date2) {
        if (typeof date1 === "string" && typeof date2 === "string") {
            const dateObject1 = luxon_1.DateTime.fromISO(date1);
            const dateObject2 = luxon_1.DateTime.fromISO(date2);
            if (!dateObject1.isValid || !dateObject2.isValid)
                return null;
            return dateObject1 < dateObject2;
        }
        else if (date1 instanceof DateTime && date2 instanceof DateTime) {
            return date1.DateTime < date2.DateTime;
        }
        return null;
    }
    static hasValidDates(dates) {
        return dates.start !== undefined && dates.end !== undefined;
    }
    isOverlapping(datePair) {
        return datePair.every((pair) => !luxon_1.Interval.fromDateTimes(pair.start.DateTime, pair.end.DateTime).contains(this._luxonDateTime));
    }
    static isOverlapping(datePair, selectedDatePair) {
        const selectedInterval = luxon_1.Interval.fromDateTimes(selectedDatePair.start.DateTime, selectedDatePair.end.DateTime);
        return datePair.every((pair) => !luxon_1.Interval.fromDateTimes(pair.start.DateTime, pair.end.DateTime).overlaps(selectedInterval));
    }
    // public static toDatePairs(intervals: Interval[]): DatePair[] {
    //   return intervals.map((pair) => ({
    //     start: DateTime.fromLuxonDateTime(pair.start),
    //     end: DateTime.fromLuxonDateTime(pair.end),
    //   }));
    // }
    static toIntervals(datePair) {
        return datePair.map((pair) => luxon_1.Interval.fromDateTimes(pair.start.DateTime, pair.end.DateTime));
    }
    getUserAge() {
        const birthdayDate = this._luxonDateTime;
        if (!birthdayDate.isValid)
            return null;
        const todayDate = DateTime.now().DateTime;
        const age = luxon_1.Interval.fromDateTimes(birthdayDate, todayDate).length("years");
        return String(Math.floor(age));
    }
    static getUserAgeFromNow(dateString, now) {
        const birthdayDate = DateTime.fromString(dateString).DateTime;
        if (!birthdayDate.isValid)
            return null;
        const age = luxon_1.Interval.fromDateTimes(birthdayDate, now.DateTime).length("years");
        return String(Math.floor(age));
    }
    static getUserAge(dateString) {
        return DateTime.getUserAgeFromNow(dateString, DateTime.now());
    }
    addMonths(months) {
        return DateTime.fromLuxonDateTime(this._luxonDateTime.plus({ months }));
    }
    addDays(days) {
        return DateTime.fromLuxonDateTime(this._luxonDateTime.plus({ days }));
    }
    addHours(hours) {
        return DateTime.fromLuxonDateTime(this._luxonDateTime.plus({ hours }));
    }
    getDateWithZeroTime() {
        return DateTime.fromLuxonDateTime(luxon_1.DateTime.local(this._luxonDateTime.year, this._luxonDateTime.month, this._luxonDateTime.day));
    }
    clone() {
        return DateTime.fromString(this.toUTCString());
    }
    static isValidISODateTimeString(dateString) {
        const result = luxon_1.DateTime.fromISO(dateString);
        return result.isValid;
    }
}
exports.DateTime = DateTime;
DateTime.Holidays = [];
String.prototype.toCustomDateTime = function () {
    return DateTime.fromUTCString(this.toString());
};
exports.default = DateTime;
