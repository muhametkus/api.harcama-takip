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
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const cards_service_1 = require("../cards/cards.service");
const date_range_util_1 = require("../common/utils/date-range.util");
const prisma_service_1 = require("../prisma/prisma.service");
let ExpensesService = class ExpensesService {
    prisma;
    cardsService;
    constructor(prisma, cardsService) {
        this.prisma = prisma;
        this.cardsService = cardsService;
    }
    async create(dto) {
        const amount = new client_1.Prisma.Decimal(dto.amount);
        const expenseDate = dto.date ? new Date(dto.date) : new Date();
        if (dto.paymentMethod === client_1.PaymentMethod.CARD) {
            if (!dto.cardId) {
                throw new common_1.BadRequestException('cardId is required when paymentMethod is CARD');
            }
            await this.cardsService.ensureExists(dto.cardId);
            return this.prisma.$transaction(async (tx) => {
                const expense = await tx.expense.create({
                    data: {
                        amount,
                        category: dto.category,
                        description: dto.description,
                        date: expenseDate,
                        paymentMethod: dto.paymentMethod,
                        cardId: dto.cardId,
                    },
                });
                await tx.card.update({
                    where: { id: dto.cardId },
                    data: {
                        currentDebt: {
                            increment: amount,
                        },
                    },
                });
                return expense;
            });
        }
        if (dto.cardId) {
            throw new common_1.BadRequestException('cardId must be empty when paymentMethod is CASH');
        }
        return this.prisma.expense.create({
            data: {
                amount,
                category: dto.category,
                description: dto.description,
                date: expenseDate,
                paymentMethod: dto.paymentMethod,
            },
        });
    }
    async findAll(query) {
        const weekly = query.weekly === 'true';
        const monthly = query.monthly === 'true';
        if (weekly && monthly) {
            throw new common_1.BadRequestException('weekly and monthly filters cannot be used together');
        }
        const where = {};
        if (query.cardId) {
            where.cardId = query.cardId;
        }
        if (query.category) {
            where.category = query.category;
        }
        if (weekly) {
            const { start, end } = (0, date_range_util_1.getWeekRange)(new Date());
            where.date = { gte: start, lt: end };
        }
        if (monthly) {
            const { start, end } = (0, date_range_util_1.getMonthRange)(new Date());
            where.date = { gte: start, lt: end };
        }
        return this.prisma.expense.findMany({
            where,
            orderBy: { date: 'desc' },
        });
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cards_service_1.CardsService])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map