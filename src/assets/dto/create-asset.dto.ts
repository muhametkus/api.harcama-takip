import { ApiProperty } from '@nestjs/swagger';
import { AssetType } from '@prisma/client';
import { IsEnum, Matches } from 'class-validator';
import { ToDecimalString } from '../../common/utils/transform.util';

export class CreateAssetDto {
  @ApiProperty({ enum: AssetType, example: AssetType.CASH })
  @IsEnum(AssetType)
  type!: AssetType;

  @ApiProperty({ example: '7000.00' })
  @ToDecimalString()
  @Matches(/^\d+(\.\d{1,2})?$/, { message: 'amount must be a decimal string' })
  amount!: string;
}
