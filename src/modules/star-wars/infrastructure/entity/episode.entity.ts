import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class EpisodeEntity{
  @PrimaryColumn({ length: 500 })
  name: string;
}
