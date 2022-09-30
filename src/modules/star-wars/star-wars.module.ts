import { Module } from '@nestjs/common';
import { StarWarsController } from './star-wars.controller';
import { TypeormCharacterRepository } from './infrastructure/character.repository';
import { CharacterRepository } from './application/character.repository.interface';

@Module({
  imports: [],
  controllers: [StarWarsController],
  providers: [
    { provide: CharacterRepository, useClass: TypeormCharacterRepository }
  ],
})
export class StarWarsModule {
}
