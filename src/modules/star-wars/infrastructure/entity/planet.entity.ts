import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class PlanetEntity{
  @PrimaryColumn({ length: 500 })
  name: string;
}
