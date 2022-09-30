import { CharacterRepository } from "../application/character.repository.interface";
import { CreateOrUpdateCharacterDto } from "../application/dto/create-or-update-character.dto";
import { Character } from "../model/character";

export class TypeormCharacterRepository implements CharacterRepository {
  private store = []

  getMany(page: number, pageSize: number): Promise<Character[]> {
    return Promise.resolve(this.store);
  }

  create(character: CreateOrUpdateCharacterDto): Promise<void> {
    this.store.push(character)
    return Promise.resolve();
  }

  update(id: number, character: CreateOrUpdateCharacterDto): Promise<void> {
    this.store[id] = character;
    return Promise.resolve(undefined);
  }

  delete(id: number): Promise<void> {
    this.store.splice(id)
    return Promise.resolve(undefined);
  }

  get(id: number): Promise<Character> {
    return Promise.resolve(this.store[id]);
  }
}
