import {
  IsString, IsOptional, ValidateNested, IsNotEmpty, MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class EpisodeDto {
  @ApiProperty()
  @IsString()
  @MaxLength(500)
  name: string
}

export class PlanetDto {
  @ApiProperty()
  @IsString()
  @MaxLength(500)
  name: string
}

export class CreateOrUpdateCharacterDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty({ isArray: true, type: EpisodeDto })
  @Type(() => EpisodeDto)
  @ValidateNested()
  @IsNotEmpty()
  episodes: EpisodeDto[]

  @ApiProperty({ type: PlanetDto })
  @Type(() => PlanetDto)
  @ValidateNested()
  @IsOptional()
  planet?: PlanetDto
}
