import { Test, TestingModule } from '@nestjs/testing';
import { TypeormCharacterRepository } from './character.repository';
import { Repository, Not, IsNull } from 'typeorm';
import { CharacterEntity } from './entity/character.entity';
import { characterRepositoryToken } from './character.providers';
import { Character } from '../model/character';
import { CreateOrUpdateCharacterDto } from '../application/dto/create-or-update-character.dto';
import { CharacterNotFoundException } from '../application/exception/character-not-found.exception';

describe('TypeormCharacterRepository', () => {
  let repository: TypeormCharacterRepository;
  let internalRepository: Repository<CharacterEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeormCharacterRepository],
      providers: [
        {
          provide: characterRepositoryToken,
          useValue: {
            find: jest.fn(),
            count: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    })
      .compile();

    repository = module.get<TypeormCharacterRepository>(TypeormCharacterRepository);
    internalRepository = module.get<Repository<CharacterEntity>>(characterRepositoryToken);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getMany', () => {
    it('should use internal repository to make paginated query', async () => {
      const mockCharacters = [{}] as CharacterEntity[]
      const count = 1;
      jest.spyOn(internalRepository, 'find').mockResolvedValue(mockCharacters);
      jest.spyOn(internalRepository, 'count').mockResolvedValue(count);
      const page = 3
      const pageSize = 10;

      const result = await repository.getMany(page, pageSize);

      expect(result).toEqual({ characters: mockCharacters, totalCount: count })
      expect(internalRepository.find).toHaveBeenCalledWith({
        relations: ['episodes', 'planet'],
        take: 10,
        skip: 20,
        where: {
          deleted: IsNull()
        }
      });
      expect(internalRepository.count).toHaveBeenCalledWith({
        where: {
          deleted: IsNull()
        }
      })
    });
  });

  describe('get', () => {
    it('should use internal repository to make query', async () => {
      const mockCharacter = {} as CharacterEntity
      jest.spyOn(internalRepository, 'findOne').mockResolvedValue(mockCharacter);
      const id = 3

      const result = await repository.get(id);

      expect(result).toBe(mockCharacter)
      expect(internalRepository.findOne).toHaveBeenCalledWith({
        relations: ['episodes', 'planet'],
        where: { id: 3 }
      })
    });
  });

  describe('create', () => {
    it('should use internal repository to make query', async () => {
      const spy = jest.spyOn(internalRepository, 'save').mockResolvedValue({ id: 1 } as CharacterEntity);
      const dto: CreateOrUpdateCharacterDto = {
        name: 'test',
        episodes: [{ name: 's0e1' }, { name: 's0e2' }]
      }

      await repository.create(dto);

      const expectedEntity = spy.mock.calls[0][0]
      expect(expectedEntity).toBeInstanceOf(CharacterEntity)
    });
  });

  describe('update', () => {
    it('should throw if character not found', async () => {
      jest.spyOn(internalRepository, 'findOne').mockResolvedValue(null);
      const dto: CreateOrUpdateCharacterDto = {
        name: 'test',
        episodes: [{ name: 's0e1' }, { name: 's0e2' }]
      }
      const id = 1;

      expect.hasAssertions()
      try {
        await repository.update(id, dto);
      } catch (e) {
        expect(e).toBeInstanceOf(CharacterNotFoundException)
      }
    });

    it('should use internal repository to make changes', async () => {
      const originalCharacter = {
        id: 1,
        name: 'darth vader',
        episodes: [],
        planet: null,
        deleted: null
      };
      const id = 1;
      jest.spyOn(internalRepository, 'findOne').mockResolvedValue(originalCharacter);
      const spy = jest.spyOn(internalRepository, 'save').mockResolvedValue(null);
      const dto: CreateOrUpdateCharacterDto = {
        name: 'test',
        episodes: [{ name: 's0e1' }, { name: 's0e2' }]
      }

      await repository.update(id, dto);

      expect(spy).toHaveBeenCalled()
    });
  });

  describe('delete', () => {
    it('should use internal repository to make query', async () => {
      const originalCharacter = {
        id: 1,
        name: 'darth vader',
        episodes: [],
        planet: null,
        deleted: null
      };
      jest.spyOn(internalRepository, 'findOne').mockResolvedValue(originalCharacter);
      const spy = jest.spyOn(internalRepository, 'save').mockResolvedValue(null);

      await repository.delete(1);

      const expectedEntity = spy.mock.calls[0][0];
      expect(expectedEntity.deleted).toBeTruthy();
    });
  });

});
