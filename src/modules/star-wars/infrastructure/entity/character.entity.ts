import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne
} from 'typeorm';
import { EpisodeEntity } from './episode.entity';
import { PlanetEntity } from './planet.entity';

@Entity()
export class CharacterEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  name: string;

  @ManyToMany(() => EpisodeEntity, { cascade: true })
  @JoinTable({ name: 'character_episode' })
  episodes: EpisodeEntity[]

  @ManyToOne(() => PlanetEntity, { cascade: true })
  @JoinColumn()
  planet: PlanetEntity
}
