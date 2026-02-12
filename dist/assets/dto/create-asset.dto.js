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
exports.CreateAssetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
const transform_util_1 = require("../../common/utils/transform.util");
class CreateAssetDto {
    type;
    amount;
}
exports.CreateAssetDto = CreateAssetDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.AssetType, example: client_1.AssetType.CASH }),
    (0, class_validator_1.IsEnum)(client_1.AssetType),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '7000.00' }),
    (0, transform_util_1.ToDecimalString)(),
    (0, class_validator_1.Matches)(/^\d+(\.\d{1,2})?$/, { message: 'amount must be a decimal string' }),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "amount", void 0);
//# sourceMappingURL=create-asset.dto.js.map