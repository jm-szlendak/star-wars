import { Character } from '../model/character';
import { CreateOrUpdateCharacterDto } from './dto/create-or-update-character.dto';

export abstract class CharacterRepository {
  abstract get(id: number): Promise<Character>;

  abstract create(character: CreateOrUpdateCharacterDto): Promise<void>;

  abstract update(id: number, character: CreateOrUpdateCharacterDto): Promise<void>;

  abstract getMany(page: number, pageSize: number): Promise<Character[]>;

  abstract delete(id: number): Promise<void>;
}
