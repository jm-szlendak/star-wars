import { Test, TestingModule } from '@nestjs/testing';
import { StarWarsController } from './star-wars.controller';
import { CharacterRepository } from './application/character.repository.interface';
import { Character } from './model/character';
import { CreateOrUpdateCharacterDto } from './application/dto/create-or-update-character.dto';

describe('StarWarsController', () => {
  let controller: StarWarsController;
  let repository: CharacterRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarWarsController],
      providers: [
        {
          provide: CharacterRepository,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            get: jest.fn(),
            getMany: jest.fn(),
          },
        },
      ],
    })
      .compile();

    controller = module.get<StarWarsController>(StarWarsController);
    repository = module.get<CharacterRepository>(CharacterRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /star-wars/characters', () => {
    it('should use repository to query characters', async () => {
      const mockCharacters = [{}] as Character[]
      jest.spyOn(repository, 'getMany').mockResolvedValue({ characters: mockCharacters, totalCount: 1 });
      const page = 3
      const pageSize = 10;
      const result = await controller.getAllCharacters({ page, pageSize });

      expect(result).toEqual({ characters: mockCharacters, totalCount: 1 })
      expect(repository.getMany).toHaveBeenCalledWith(page, pageSize)
    });
  });

  describe('GET /star-wars/characters/:id', () => {
    it('should use repository to query character', async () => {
      const mockCharacter = {} as Character
      jest.spyOn(repository, 'get').mockResolvedValue(mockCharacter);
      const id = 3
      const result = await controller.getCharacter(id);

      expect(result).toBe(mockCharacter)
      expect(repository.get).toHaveBeenCalledWith(id)
    });
  });

  describe('POST /star-wars/characters', () => {
    it('should use repository to insert character', async () => {
      jest.spyOn(repository, 'create').mockResolvedValue(null);
      const dto: CreateOrUpdateCharacterDto = { name: 'test', episodes: [{ name: 'one' }], planet: { name: 'mars' } }
      await controller.createCharacter(dto);

      expect(repository.create).toHaveBeenCalledWith(dto)
    });
  });

  describe('PATCH /star-wars/characters/:id', () => {
    it('should use repository to update character', async () => {
      jest.spyOn(repository, 'update').mockResolvedValue(null);
      const dto: CreateOrUpdateCharacterDto = { name: 'test', episodes: [{ name: 'one' }], planet: { name: 'mars' } }
      const id = 1
      await controller.updateCharacter(id, dto);

      expect(repository.update).toHaveBeenCalledWith(id, dto)
    });
  });

  describe('DELETE /star-wars/characters/:id', () => {
    it('should use repository to update character', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue(null);
      const id = 1
      await controller.deleteCharacter(id);

      expect(repository.delete).toHaveBeenCalledWith(id)
    });
  });
});
