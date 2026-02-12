import { Prisma } from '@prisma/client';
import { CardsService } from '../cards/cards.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { QueryExpensesDto } from './dto/query-expenses.dto';
export declare class ExpensesService {
    private readonly prisma;
    private readonly cardsService;
    constructor(prisma: PrismaService, cardsService: CardsService);
    create(dto: CreateExpenseDto): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        amount: Prisma.Decimal;
        category: string;
        date: Date;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        cardId: string | null;
    }>;
    findAll(query: QueryExpensesDto): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        amount: Prisma.Decimal;
        category: string;
        date: Date;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        cardId: string | null;
    }[]>;
}
