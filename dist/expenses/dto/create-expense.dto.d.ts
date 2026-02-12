import { PaymentMethod } from '@prisma/client';
export declare class CreateExpenseDto {
    amount: string;
    category: string;
    description?: string;
    date?: string;
    paymentMethod: PaymentMethod;
    cardId?: string;
}
