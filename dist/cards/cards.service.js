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
exports.CardsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let CardsService = class CardsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.card.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async create(dto) {
        return this.prisma.card.create({
            data: {
                ...dto,
                limit: new client_1.Prisma.Decimal(dto.limit),
                currentDebt: new client_1.Prisma.Decimal(dto.currentDebt ?? '0'),
            },
        });
    }
    async update(id, dto) {
        await this.ensureExists(id);
        return this.prisma.card.update({
            where: { id },
            data: {
                ...(dto.name ? { name: dto.name } : {}),
                ...(dto.limit ? { limit: new client_1.Prisma.Decimal(dto.limit) } : {}),
                ...(dto.currentDebt
                    ? { currentDebt: new client_1.Prisma.Decimal(dto.currentDebt) }
                    : {}),
                ...(dto.statementDate ? { statementDate: dto.statementDate } : {}),
                ...(dto.dueDate ? { dueDate: dto.dueDate } : {}),
            },
        });
    }
    async remove(id) {
        await this.ensureExists(id);
        await this.prisma.card.delete({ where: { id } });
        return { message: 'Card deleted successfully' };
    }
    async ensureExists(id) {
        const card = await this.prisma.card.findUnique({ where: { id } });
        if (!card) {
            throw new common_1.NotFoundException(`Card not found: ${id}`);
        }
        return card;
    }
};
exports.CardsService = CardsService;
exports.CardsService = CardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CardsService);
//# sourceMappingURL=cards.service.js.map