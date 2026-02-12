import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { decimalToString, toDecimal } from '../common/utils/decimal.util';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalysisService {
  constructor(private readonly prisma: PrismaService) {}

  async getDebtForecast() {
    const totalDebtAgg = await this.prisma.card.aggregate({
      _sum: { currentDebt: true },
    });
    const totalDebt = toDecimal(totalDebtAgg._sum.currentDebt);

    const monthResults = await Promise.all(
      [0, 1, 2].map((offset) => this.calculateNetDecreaseForMonth(offset)),
    );

    const totalNetDecrease = monthResults.reduce(
      (acc, value) => acc.add(value),
      new Prisma.Decimal(0),
    );
    const averageMonthlyDecrease = totalNetDecrease.div(3);

    const hasValidForecast =
      totalDebt.greaterThan(0) && averageMonthlyDecrease.greaterThan(0);

    const estimatedMonthsToFinish = hasValidForecast
      ? Number(totalDebt.div(averageMonthlyDecrease).ceil().toString())
      : null;

    const estimatedDebtFreeDate =
      estimatedMonthsToFinish !== null
        ? this.addMonthsToDate(new Date(), estimatedMonthsToFinish)
        : null;

    return {
      averageMonthlyDecrease: decimalToString(averageMonthlyDecrease),
      estimatedMonthsToFinish,
      estimatedDebtFreeDate,
    };
  }

  private async calculateNetDecreaseForMonth(
    offset: number,
  ): Promise<Prisma.Decimal> {
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

    const cardExpenses = toDecimal(cardExpenseAgg._sum.amount);
    const payments = toDecimal(paymentAgg._sum.amount);

    return payments.sub(cardExpenses);
  }

  private addMonthsToDate(date: Date, months: number): string {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result.toISOString();
  }
}
