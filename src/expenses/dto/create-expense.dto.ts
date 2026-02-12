import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { ToDecimalString } from '../../common/utils/transform.util';

export class CreateExpenseDto {
  @ApiProperty({ example: '825.45' })
  @ToDecimalString()
  @Matches(/^\d+(\.\d{1,2})?$/, { message: 'amount must be a decimal string' })
  amount!: string;

  @ApiProperty({ example: 'GROCERY' })
  @IsString()
  category!: string;

  @ApiProperty({ example: 'Weekend market', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2026-02-12T10:30:00.000Z', required: false })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.CARD })
  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @ApiProperty({
    required: false,
    example: '9f453133-8b2b-4d4d-b8fe-df2f7194f64a',
  })
  @IsOptional()
  @IsUUID()
  cardId?: string;
}
