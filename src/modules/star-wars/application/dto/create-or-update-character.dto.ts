import {
  IsString, IsAlphanumeric, IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class EpisodeDto {
  @ApiProperty()
  @IsString()
  @IsAlphanumeric()
  name: string
}

export class PlanetDto {
  @ApiProperty()
  @IsString()
  @IsAlphanumeric()
  name: string
}

export class CreateOrUpdateCharacterDto {
  @ApiProperty()
  @IsString()
  @IsAlphanumeric()
  name: string

  @ApiProperty({ isArray: true, type: EpisodeDto })
  @Type(() => EpisodeDto)
  episodes: EpisodeDto[]

  @ApiProperty({ type: PlanetDto })
  @Type(() => PlanetDto)
  @IsOptional()
  planet?: PlanetDto
}
