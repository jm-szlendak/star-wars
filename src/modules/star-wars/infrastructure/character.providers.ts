import { DataSource } from 'typeorm';
import { CharacterEntity } from './entity/character.entity';
import { dataSourceToken } from '../../../database/database.providers';

export const characterRepositoryToken = 'CHARACTER_REPOSTIORY'
export const characterRepositoryProviders = [
  {
    provide: characterRepositoryToken,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CharacterEntity),
    inject: [dataSourceToken],
  },
];
