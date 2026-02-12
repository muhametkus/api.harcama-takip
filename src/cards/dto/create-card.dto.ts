import { ApiProperty } from '@nestjs/swagger';
import {
  Matches,
  Max,
  Min,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ToDecimalString } from '../../common/utils/transform.util';

export class CreateCardDto {
  @ApiProperty({ example: 'Garanti Bonus' })
  @IsString()
  name!: string;

  @ApiProperty({ example: '25000.00' })
  @ToDecimalString()
  @Matches(/^\d+(\.\d{1,2})?$/, { message: 'limit must be a decimal string' })
  limit!: string;

  @ApiProperty({ example: '5000.00', required: false, default: '0.00' })
  @IsOptional()
  @ToDecimalString()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'currentDebt must be a decimal string',
  })
  currentDebt?: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  @Max(31)
  statementDate!: number;

  @ApiProperty({ example: 20 })
  @IsInt()
  @Min(1)
  @Max(31)
  dueDate!: number;
}
