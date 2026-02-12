import { CreateExpenseDto } from './dto/create-expense.dto';
import { QueryExpensesDto } from './dto/query-expenses.dto';
import { ExpensesService } from './expenses.service';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    create(dto: CreateExpenseDto): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
        category: string;
        date: Date;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        cardId: string | null;
    }>;
    findAll(query: QueryExpensesDto): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
        category: string;
        date: Date;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        cardId: string | null;
    }[]>;
}
