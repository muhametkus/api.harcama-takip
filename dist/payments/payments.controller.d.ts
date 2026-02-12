import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(dto: CreatePaymentDto): Promise<{
        id: string;
        createdAt: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
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
        amount: import("@prisma/client-runtime-utils").Decimal;
        date: Date;
        cardId: string;
    })[]>;
}
