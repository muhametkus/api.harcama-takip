import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class AssetsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.asset.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateAssetDto) {
    return this.prisma.asset.create({
      data: {
        type: dto.type,
        amount: new Prisma.Decimal(dto.amount),
      },
    });
  }
}
