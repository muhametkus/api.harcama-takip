"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDecimal = toDecimal;
exports.decimalToString = decimalToString;
const client_1 = require("@prisma/client");
function toDecimal(value) {
    if (value === null || value === undefined) {
        return new client_1.Prisma.Decimal(0);
    }
    return value instanceof client_1.Prisma.Decimal ? value : new client_1.Prisma.Decimal(value);
}
function decimalToString(value) {
    return toDecimal(value).toFixed(2);
}
//# sourceMappingURL=decimal.util.js.map