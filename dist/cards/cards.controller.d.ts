import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    findAll(): Promise<{
        name: string;
        limit: import("@prisma/client-runtime-utils").Decimal;
        currentDebt: import("@prisma/client-runtime-utils").Decimal;
        statementDate: number;
        dueDate: number;
        id: string;
        createdAt: Date;
    }[]>;
    create(dto: CreateCardDto): Promise<{
        name: string;
        limit: import("@prisma/client-runtime-utils").Decimal;
        currentDebt: import("@prisma/client-runtime-utils").Decimal;
        statementDate: number;
        dueDate: number;
        id: string;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateCardDto): Promise<{
        name: string;
        limit: import("@prisma/client-runtime-utils").Decimal;
        currentDebt: import("@prisma/client-runtime-utils").Decimal;
        statementDate: number;
        dueDate: number;
        id: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
