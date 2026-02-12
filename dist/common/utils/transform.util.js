"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDecimalString = ToDecimalString;
const class_transformer_1 = require("class-transformer");
function ToDecimalString() {
    return (0, class_transformer_1.Transform)((params) => {
        const { value } = params;
        if (typeof value === 'number') {
            return value.toString();
        }
        return value;
    });
}
//# sourceMappingURL=transform.util.js.map