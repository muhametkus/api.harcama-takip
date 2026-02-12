import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentMethod, Prisma } from '@prisma/client';
import { CardsService } from '../cards/cards.service';
import { getMonthRange, getWeekRange } from '../common/utils/date-range.util';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { QueryExpensesDto } from './dto/query-expenses.dto';

@Injectable()
export class ExpensesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardsService: CardsService,
  ) {}

  async create(dto: CreateExpenseDto) {
    const amount = new Prisma.Decimal(dto.amount);
    const expenseDate = dto.date ? new Date(dto.date) : new Date();

    if (dto.paymentMethod === PaymentMethod.CARD) {
      if (!dto.cardId) {
        throw new BadRequestException(
          'cardId is required when paymentMethod is CARD',
        );
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
      throw new BadRequestException(
        'cardId must be empty when paymentMethod is CASH',
      );
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

  async findAll(query: QueryExpensesDto) {
    const weekly = query.weekly === 'true';
    const monthly = query.monthly === 'true';

    if (weekly && monthly) {
      throw new BadRequestException(
        'weekly and monthly filters cannot be used together',
      );
    }

    const where: Prisma.ExpenseWhereInput = {};

    if (query.cardId) {
      where.cardId = query.cardId;
    }

    if (query.category) {
      where.category = query.category;
    }

    if (weekly) {
      const { start, end } = getWeekRange(new Date());
      where.date = { gte: start, lt: end };
    }

    if (monthly) {
      const { start, end } = getMonthRange(new Date());
      where.date = { gte: start, lt: end };
    }

    return this.prisma.expense.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }
}
