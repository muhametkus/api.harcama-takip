import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBooleanString, IsOptional, IsString, IsUUID } from 'class-validator';

export class QueryExpensesDto {
  @ApiPropertyOptional({ example: 'true' })
  @IsOptional()
  @IsBooleanString()
  weekly?: string;

  @ApiPropertyOptional({ example: 'true' })
  @IsOptional()
  @IsBooleanString()
  monthly?: string;

  @ApiPropertyOptional({ example: '9f453133-8b2b-4d4d-b8fe-df2f7194f64a' })
  @IsOptional()
  @IsUUID()
  cardId?: string;

  @ApiPropertyOptional({ example: 'GROCERY' })
  @IsOptional()
  @IsString()
  category?: string;
}
