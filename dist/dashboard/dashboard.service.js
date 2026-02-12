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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const limits_1 = require("../common/constants/limits");
const date_range_util_1 = require("../common/utils/date-range.util");
const decimal_util_1 = require("../common/utils/decimal.util");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboard() {
        const now = new Date();
        const { start: monthStart, end: monthEnd } = (0, date_range_util_1.getMonthRange)(now);
        const { start: weekStart, end: weekEnd } = (0, date_range_util_1.getWeekRange)(now);
        const [cardAgg, assetsAgg, monthlyExpenseAgg, monthlyPaymentAgg, weeklyExpenseAgg,] = await Promise.all([
            this.prisma.card.aggregate({ _sum: { currentDebt: true, limit: true } }),
            this.prisma.asset.aggregate({ _sum: { amount: true } }),
            this.prisma.expense.aggregate({
                where: { date: { gte: monthStart, lt: monthEnd } },
                _sum: { amount: true },
            }),
            this.prisma.payment.aggregate({
                where: { date: { gte: monthStart, lt: monthEnd } },
                _sum: { amount: true },
            }),
            this.prisma.expense.aggregate({
                where: { date: { gte: weekStart, lt: weekEnd } },
                _sum: { amount: true },
            }),
        ]);
        const totalDebt = (0, decimal_util_1.toDecimal)(cardAgg._sum.currentDebt);
        const totalLimit = (0, decimal_util_1.toDecimal)(cardAgg._sum.limit);
        const totalAssets = (0, decimal_util_1.toDecimal)(assetsAgg._sum.amount);
        const monthlyExpense = (0, decimal_util_1.toDecimal)(monthlyExpenseAgg._sum.amount);
        const monthlyPayment = (0, decimal_util_1.toDecimal)(monthlyPaymentAgg._sum.amount);
        const weeklyExpense = (0, decimal_util_1.toDecimal)(weeklyExpenseAgg._sum.amount);
        const weeklyLimit = new client_1.Prisma.Decimal(limits_1.WEEKLY_LIMIT);
        const usageRate = totalLimit.equals(0)
            ? '0.00'
            : totalDebt.div(totalLimit).mul(100).toFixed(2);
        const netWorth = totalAssets.sub(totalDebt);
        const weeklyLimitStatus = this.calculateWeeklyLimitStatus(weeklyExpense, weeklyLimit);
        return {
            totalDebt: (0, decimal_util_1.decimalToString)(totalDebt),
            totalLimit: (0, decimal_util_1.decimalToString)(totalLimit),
            usageRate,
            totalAssets: (0, decimal_util_1.decimalToString)(totalAssets),
            netWorth: (0, decimal_util_1.decimalToString)(netWorth),
            monthlyExpense: (0, decimal_util_1.decimalToString)(monthlyExpense),
            monthlyPayment: (0, decimal_util_1.decimalToString)(monthlyPayment),
            weeklyExpense: (0, decimal_util_1.decimalToString)(weeklyExpense),
            weeklyLimitStatus,
        };
    }
    calculateWeeklyLimitStatus(weeklySpent, weeklyLimit) {
        const remaining = weeklyLimit.sub(weeklySpent);
        let status = 'SAFE';
        if (weeklySpent.greaterThan(weeklyLimit)) {
            status = 'EXCEEDED';
        }
        else if (weeklySpent.div(weeklyLimit).greaterThanOrEqualTo(limits_1.WARNING_THRESHOLD_RATE)) {
            status = 'WARNING';
        }
        return {
            weeklySpent: (0, decimal_util_1.decimalToString)(weeklySpent),
            weeklyLimit: (0, decimal_util_1.decimalToString)(weeklyLimit),
            remaining: (0, decimal_util_1.decimalToString)(remaining),
            status,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map