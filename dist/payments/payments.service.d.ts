import { Prisma } from '@prisma/client';
import { CardsService } from '../cards/cards.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsService {
    private readonly prisma;
    private readonly cardsService;
    constructor(prisma: PrismaService, cardsService: CardsService);
    create(dto: CreatePaymentDto): Promise<{
        id: string;
        createdAt: Date;
        amount: Prisma.Decimal;
        date: Date;
        cardId: string;
    }>;
    findAll(): Promise<({
        card: {
            name: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        amount: Prisma.Decimal;
        date: Date;
        cardId: string;
    })[]>;
}
