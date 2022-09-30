import {
  IsString, IsAlphanumeric, IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrUpdateCharacterDto {
  @ApiProperty()
  @IsString()
  @IsAlphanumeric()
  name: string

  @ApiProperty({ isArray: true })
  @IsString({ each: true })
  @IsAlphanumeric()
  episodes: string[]

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  planet: string | null
}
