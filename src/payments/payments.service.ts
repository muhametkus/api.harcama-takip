import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CardsService } from '../cards/cards.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardsService: CardsService,
  ) {}

  async create(dto: CreatePaymentDto) {
    const amount = new Prisma.Decimal(dto.amount);
    const paymentDate = dto.date ? new Date(dto.date) : new Date();
    const card = await this.cardsService.ensureExists(dto.cardId);

    if (card.currentDebt.lessThan(amount)) {
      throw new BadRequestException(
        'Payment amount cannot exceed current card debt',
      );
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
}
