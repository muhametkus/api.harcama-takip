import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsUUID, Matches } from 'class-validator';
import { ToDecimalString } from '../../common/utils/transform.util';

export class CreatePaymentDto {
  @ApiProperty({ example: '2300.00' })
  @ToDecimalString()
  @Matches(/^\d+(\.\d{1,2})?$/, { message: 'amount must be a decimal string' })
  amount!: string;

  @ApiProperty({ example: '2026-02-12T10:30:00.000Z', required: false })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ example: '9f453133-8b2b-4d4d-b8fe-df2f7194f64a' })
  @IsUUID()
  cardId!: string;
}
