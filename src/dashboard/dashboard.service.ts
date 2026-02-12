import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  WARNING_THRESHOLD_RATE,
  WEEKLY_LIMIT,
} from '../common/constants/limits';
import { getMonthRange, getWeekRange } from '../common/utils/date-range.util';
import { decimalToString, toDecimal } from '../common/utils/decimal.util';
import { PrismaService } from '../prisma/prisma.service';

type WeeklyStatus = 'SAFE' | 'WARNING' | 'EXCEEDED';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard() {
    const now = new Date();
    const { start: monthStart, end: monthEnd } = getMonthRange(now);
    const { start: weekStart, end: weekEnd } = getWeekRange(now);

    const [
      cardAgg,
      assetsAgg,
      monthlyExpenseAgg,
      monthlyPaymentAgg,
      weeklyExpenseAgg,
    ] = await Promise.all([
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

    const totalDebt = toDecimal(cardAgg._sum.currentDebt);
    const totalLimit = toDecimal(cardAgg._sum.limit);
    const totalAssets = toDecimal(assetsAgg._sum.amount);
    const monthlyExpense = toDecimal(monthlyExpenseAgg._sum.amount);
    const monthlyPayment = toDecimal(monthlyPaymentAgg._sum.amount);
    const weeklyExpense = toDecimal(weeklyExpenseAgg._sum.amount);
    const weeklyLimit = new Prisma.Decimal(WEEKLY_LIMIT);

    const usageRate = totalLimit.equals(0)
      ? '0.00'
      : totalDebt.div(totalLimit).mul(100).toFixed(2);
    const netWorth = totalAssets.sub(totalDebt);

    const weeklyLimitStatus = this.calculateWeeklyLimitStatus(
      weeklyExpense,
      weeklyLimit,
    );

    return {
      totalDebt: decimalToString(totalDebt),
      totalLimit: decimalToString(totalLimit),
      usageRate,
      totalAssets: decimalToString(totalAssets),
      netWorth: decimalToString(netWorth),
      monthlyExpense: decimalToString(monthlyExpense),
      monthlyPayment: decimalToString(monthlyPayment),
      weeklyExpense: decimalToString(weeklyExpense),
      weeklyLimitStatus,
    };
  }

  private calculateWeeklyLimitStatus(
    weeklySpent: Prisma.Decimal,
    weeklyLimit: Prisma.Decimal,
  ) {
    const remaining = weeklyLimit.sub(weeklySpent);
    let status: WeeklyStatus = 'SAFE';

    if (weeklySpent.greaterThan(weeklyLimit)) {
      status = 'EXCEEDED';
    } else if (
      weeklySpent.div(weeklyLimit).greaterThanOrEqualTo(WARNING_THRESHOLD_RATE)
    ) {
      status = 'WARNING';
    }

    return {
      weeklySpent: decimalToString(weeklySpent),
      weeklyLimit: decimalToString(weeklyLimit),
      remaining: decimalToString(remaining),
      status,
    };
  }
}
