import { Module } from '@nestjs/common';
import { StarWarsController } from './star-wars.controller';
import { TypeormCharacterRepository } from './infrastructure/character.repository';
import { CharacterRepository } from './application/character.repository.interface';
import { DatabaseModule } from '../../database/database.module';
import { characterRepositoryProviders } from './infrastructure/character.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [StarWarsController],
  providers: [
    ...characterRepositoryProviders,
    { provide: CharacterRepository, useClass: TypeormCharacterRepository }
  ],
})
export class StarWarsModule {
}
