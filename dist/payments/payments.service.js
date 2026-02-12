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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const cards_service_1 = require("../cards/cards.service");
const prisma_service_1 = require("../prisma/prisma.service");
let PaymentsService = class PaymentsService {
    prisma;
    cardsService;
    constructor(prisma, cardsService) {
        this.prisma = prisma;
        this.cardsService = cardsService;
    }
    async create(dto) {
        const amount = new client_1.Prisma.Decimal(dto.amount);
        const paymentDate = dto.date ? new Date(dto.date) : new Date();
        const card = await this.cardsService.ensureExists(dto.cardId);
        if (card.currentDebt.lessThan(amount)) {
            throw new common_1.BadRequestException('Payment amount cannot exceed current card debt');
        }
        return this.prisma.$transaction(async (tx) => {
            const payment = await tx.payment.create({
                data: {
                    amount,
                    date: paymentDate,
                    cardId: dto.cardId,
                },
            });
            await tx.card.update({
                where: { id: dto.cardId },
                data: {
                    currentDebt: {
                        decrement: amount,
                    },
                },
            });
            return payment;
        });
    }
    async findAll() {
        return this.prisma.payment.findMany({
            orderBy: { date: 'desc' },
            include: {
                card: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cards_service_1.CardsService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map