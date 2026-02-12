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
exports.AnalysisService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const decimal_util_1 = require("../common/utils/decimal.util");
const prisma_service_1 = require("../prisma/prisma.service");
let AnalysisService = class AnalysisService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDebtForecast() {
        const totalDebtAgg = await this.prisma.card.aggregate({
            _sum: { currentDebt: true },
        });
        const totalDebt = (0, decimal_util_1.toDecimal)(totalDebtAgg._sum.currentDebt);
        const monthResults = await Promise.all([0, 1, 2].map((offset) => this.calculateNetDecreaseForMonth(offset)));
        const totalNetDecrease = monthResults.reduce((acc, value) => acc.add(value), new client_1.Prisma.Decimal(0));
        const averageMonthlyDecrease = totalNetDecrease.div(3);
        const hasValidForecast = totalDebt.greaterThan(0) && averageMonthlyDecrease.greaterThan(0);
        const estimatedMonthsToFinish = hasValidForecast
            ? Number(totalDebt.div(averageMonthlyDecrease).ceil().toString())
            : null;
        const estimatedDebtFreeDate = estimatedMonthsToFinish !== null
            ? this.addMonthsToDate(new Date(), estimatedMonthsToFinish)
            : null;
        return {
            averageMonthlyDecrease: (0, decimal_util_1.decimalToString)(averageMonthlyDecrease),
            estimatedMonthsToFinish,
            estimatedDebtFreeDate,
        };
    }
    async calculateNetDecreaseForMonth(offset) {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - offset, 1);
        const end = new Date(now.getFullYear(), now.getMonth() - offset + 1, 1);
        const [cardExpenseAgg, paymentAgg] = await Promise.all([
            this.prisma.expense.aggregate({
                where: {
                    paymentMethod: 'CARD',
                    date: { gte: start, lt: end },
                },
                _sum: { amount: true },
            }),
            this.prisma.payment.aggregate({
                where: {
                    date: { gte: start, lt: end },
                },
                _sum: { amount: true },
            }),
        ]);
        const cardExpenses = (0, decimal_util_1.toDecimal)(cardExpenseAgg._sum.amount);
        const payments = (0, decimal_util_1.toDecimal)(paymentAgg._sum.amount);
        return payments.sub(cardExpenses);
    }
    addMonthsToDate(date, months) {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result.toISOString();
    }
};
exports.AnalysisService = AnalysisService;
exports.AnalysisService = AnalysisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalysisService);
//# sourceMappingURL=analysis.service.js.map