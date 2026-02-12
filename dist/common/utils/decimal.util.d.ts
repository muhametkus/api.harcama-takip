import { Prisma } from '@prisma/client';
export declare function toDecimal(value: Prisma.Decimal | string | number | null | undefined): Prisma.Decimal;
export declare function decimalToString(value: Prisma.Decimal | null | undefined): string;
