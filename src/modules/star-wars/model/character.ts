import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Episode } from './episode';
import { Planet } from './planet';

export class Character {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string

  @ApiProperty({ isArray: true, type: Episode })
  episodes: Episode[]

  @ApiProperty({ type: Planet, nullable: true })
  planet: Planet | null

  @Exclude()
  deleted: Date
}
