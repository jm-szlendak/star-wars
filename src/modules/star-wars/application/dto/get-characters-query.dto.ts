import {
  IsInt,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

const minPageSize = 10;
const maxPageSize = 100;

export class GetCharactersQueryDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(minPageSize)
  @Max(maxPageSize)
  pageSize: number
}
