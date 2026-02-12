"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const transform_util_1 = require("../../common/utils/transform.util");
class CreatePaymentDto {
    amount;
    date;
    cardId;
}
exports.CreatePaymentDto = CreatePaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2300.00' }),
    (0, transform_util_1.ToDecimalString)(),
    (0, class_validator_1.Matches)(/^\d+(\.\d{1,2})?$/, { message: 'amount must be a decimal string' }),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-02-12T10:30:00.000Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9f453133-8b2b-4d4d-b8fe-df2f7194f64a' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "cardId", void 0);
//# sourceMappingURL=create-payment.dto.js.map