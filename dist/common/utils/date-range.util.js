"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeekRange = getWeekRange;
exports.getMonthRange = getMonthRange;
function getWeekRange(referenceDate) {
    const start = new Date(referenceDate);
    const day = start.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    start.setDate(start.getDate() + diff);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    return { start, end };
}
function getMonthRange(referenceDate) {
    const start = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
    const end = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + 1, 1);
    return { start, end };
}
//# sourceMappingURL=date-range.util.js.map