import { Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { CharacterRepository } from "../application/character.repository.interface";
import { CreateOrUpdateCharacterDto } from "../application/dto/create-or-update-character.dto";
import { Character } from "../model/character";
import { characterRepositoryToken } from "./character.providers";
import { CharacterEntity } from "./entity/character.entity";

export class TypeormCharacterRepository implements CharacterRepository {
  constructor(@Inject(characterRepositoryToken) private readonly repository: Repository<CharacterEntity>) {
  }

  getMany(page: number, pageSize: number): Promise<Character[]> {
    return this.repository.find({
      relations: ['episodes', 'planet'],
      skip: pageSize * (page - 1),
      take: pageSize * page,
    })
  }

  get(id: number): Promise<Character> {
    return this.repository.findOne({
      where: { id },
      relations: ['episodes', 'planet'],
    })
  }

  async create(character: CreateOrUpdateCharacterDto): Promise<void> {
    await this.repository.save(character)
  }

  async update(id: number, character: CreateOrUpdateCharacterDto): Promise<void> {
    const oldCharacter = this.repository.findOne({
      where: { id },
      relations: ['episodes', 'planet'],
    },)

    const updatedCharacter = Object.assign(oldCharacter, character)
    await this.repository.save(updatedCharacter)
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id })
  }
}
