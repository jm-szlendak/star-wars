import { Inject } from "@nestjs/common";
import { IsNull, Repository } from "typeorm";
import { CharacterRepository } from "../application/character.repository.interface";
import { CreateOrUpdateCharacterDto } from "../application/dto/create-or-update-character.dto";
import { CharacterNotFoundException } from "../application/exception/character-not-found.exception";
import { Character } from "../model/character";
import { characterRepositoryToken } from "./character.providers";
import { CharacterEntity } from "./entity/character.entity";
import { EpisodeEntity } from "./entity/episode.entity";
import { PlanetEntity } from "./entity/planet.entity";

const relations = ['episodes', 'planet']

export class TypeormCharacterRepository implements CharacterRepository {
  constructor(@Inject(characterRepositoryToken) private readonly repository: Repository<CharacterEntity>) {
  }

  async getMany(page: number, pageSize: number): Promise<{ characters: Character[], totalCount: number }> {
    const characters = await this.repository.find({
      relations,
      skip: pageSize * (page - 1),
      take: pageSize,
      where: {
        deleted: IsNull()
      }
    })

    const totalCount = await this.repository.count({
      where: {
        deleted: IsNull()
      }
    })

    return { characters, totalCount }
  }

  get(id: number): Promise<Character> {
    return this.findOne(id);

  }

  async create(character: CreateOrUpdateCharacterDto): Promise<number> {
    const createdCharacter = await this.repository.save(this.mapToEntity(character))

    return createdCharacter.id
  }

  async update(id: number, character: CreateOrUpdateCharacterDto): Promise<void> {
    const oldCharacter = await this.findOne(id);


    if (!oldCharacter) {
      throw new CharacterNotFoundException(id);
    }

    const updatedCharacter = Object.assign(oldCharacter, character)
    await this.repository.save(updatedCharacter)
  }

  async delete(id: number): Promise<void> {
    const oldCharacter = await this.findOne(id);

    if (!oldCharacter) {
      throw new CharacterNotFoundException(id);
    }

    oldCharacter.deleted = new Date()

    await this.repository.save(oldCharacter)
  }

  private async findOne(id: number): Promise<Character> {
    return this.repository.findOne({
      where: { id },
      relations,
    })
  }

  private mapToEntity(character: CreateOrUpdateCharacterDto): CharacterEntity {
    const characterEntity = new CharacterEntity()

    Object.assign(characterEntity, character)

    if (character.planet) {
      characterEntity.planet = new PlanetEntity()
      Object.assign(characterEntity.planet, character.planet)

    }

    characterEntity.episodes = character.episodes.map((episode) => {
      const episodeEntity = new EpisodeEntity()
      Object.assign(episodeEntity, episode)
      return episodeEntity
    })

    return characterEntity
  }
}
