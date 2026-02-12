import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
export declare class CardsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        name: string;
        limit: Prisma.Decimal;
        currentDebt: Prisma.Decimal;
        statementDate: number;
        dueDate: number;
        id: string;
        createdAt: Date;
    }[]>;
    create(dto: CreateCardDto): Promise<{
        name: string;
        limit: Prisma.Decimal;
        currentDebt: Prisma.Decimal;
        statementDate: number;
        dueDate: number;
        id: string;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateCardDto): Promise<{
        name: string;
        limit: Prisma.Decimal;
        currentDebt: Prisma.Decimal;
        statementDate: number;
        dueDate: number;
        id: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    ensureExists(id: string): Promise<{
        name: string;
        limit: Prisma.Decimal;
        currentDebt: Prisma.Decimal;
        statementDate: number;
        dueDate: number;
        id: string;
        createdAt: Date;
    }>;
}
