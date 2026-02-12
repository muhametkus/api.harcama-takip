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
exports.CreateCardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const transform_util_1 = require("../../common/utils/transform.util");
class CreateCardDto {
    name;
    limit;
    currentDebt;
    statementDate;
    dueDate;
}
exports.CreateCardDto = CreateCardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Garanti Bonus' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCardDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25000.00' }),
    (0, transform_util_1.ToDecimalString)(),
    (0, class_validator_1.Matches)(/^\d+(\.\d{1,2})?$/, { message: 'limit must be a decimal string' }),
    __metadata("design:type", String)
], CreateCardDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5000.00', required: false, default: '0.00' }),
    (0, class_validator_1.IsOptional)(),
    (0, transform_util_1.ToDecimalString)(),
    (0, class_validator_1.Matches)(/^\d+(\.\d{1,2})?$/, {
        message: 'currentDebt must be a decimal string',
    }),
    __metadata("design:type", String)
], CreateCardDto.prototype, "currentDebt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(31),
    __metadata("design:type", Number)
], CreateCardDto.prototype, "statementDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(31),
    __metadata("design:type", Number)
], CreateCardDto.prototype, "dueDate", void 0);
//# sourceMappingURL=create-card.dto.js.map