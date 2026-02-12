import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.card.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(dto: CreateCardDto) {
    return this.prisma.card.create({
      data: {
        ...dto,
        limit: new Prisma.Decimal(dto.limit),
        currentDebt: new Prisma.Decimal(dto.currentDebt ?? '0'),
      },
    });
  }

  async update(id: string, dto: UpdateCardDto) {
    await this.ensureExists(id);

    return this.prisma.card.update({
      where: { id },
      data: {
        ...(dto.name ? { name: dto.name } : {}),
        ...(dto.limit ? { limit: new Prisma.Decimal(dto.limit) } : {}),
        ...(dto.currentDebt
          ? { currentDebt: new Prisma.Decimal(dto.currentDebt) }
          : {}),
        ...(dto.statementDate ? { statementDate: dto.statementDate } : {}),
        ...(dto.dueDate ? { dueDate: dto.dueDate } : {}),
      },
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);

    await this.prisma.card.delete({ where: { id } });

    return { message: 'Card deleted successfully' };
  }

  async ensureExists(id: string) {
    const card = await this.prisma.card.findUnique({ where: { id } });

    if (!card) {
      throw new NotFoundException(`Card not found: ${id}`);
    }

    return card;
  }
}
