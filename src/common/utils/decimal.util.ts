import { Prisma } from '@prisma/client';

export function toDecimal(
  value: Prisma.Decimal | string | number | null | undefined,
): Prisma.Decimal {
  if (value === null || value === undefined) {
    return new Prisma.Decimal(0);
  }

  return value instanceof Prisma.Decimal ? value : new Prisma.Decimal(value);
}

export function decimalToString(
  value: Prisma.Decimal | null | undefined,
): string {
  return toDecimal(value).toFixed(2);
}
