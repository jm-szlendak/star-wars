import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Query,
  Post,
  Body,
  UseInterceptors, ClassSerializerInterceptor, HttpCode
} from '@nestjs/common';
import { CharacterRepository } from './application/character.repository.interface';
import { CreateOrUpdateCharacterDto } from './application/dto/create-or-update-character.dto';
import { GetCharactersQueryDto } from './application/dto/get-characters-query.dto';
import { ResponseTransformer } from '../../shared/response.transformer';
import { ApiOperation, ApiParam, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { Character } from './model/character';

@Controller('/star-wars')
@UseInterceptors(ResponseTransformer, ClassSerializerInterceptor)
export class StarWarsController {
  constructor(private readonly charactersRepository: CharacterRepository) {
  }

  @Get('characters')
  @ApiOperation({ summary: 'Get all characters' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(Character),
          },
        },
        totalCount: {
          type: 'integer'
        }
      },
    }
  })
  async getAllCharacters(
    @Query() query: GetCharactersQueryDto,
  ) {
    return this.charactersRepository.getMany(query.page, query.pageSize);
  }

  @Get('characters/:characterId')
  @ApiOperation({ summary: 'Get character by id' })
  @ApiParam({ name: 'characterId', description: 'Character ID' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          $ref: getSchemaPath(Character),
        },
      },
    }
  })
  async getCharacter(
    @Param('characterId', ParseIntPipe) id: number,
  ) {
    return this.charactersRepository.get(id)
  }

  @Patch('characters/:characterId')
  @ApiOperation({ summary: 'Update character' })
  @ApiParam({ name: 'characterId', description: 'Character ID' })
  @ApiResponse({
    status: 200
  })
  async updateCharacter(
    @Param('characterId', ParseIntPipe) id: number,
    @Body() dto: CreateOrUpdateCharacterDto,
  ) {
    return this.charactersRepository.update(id, dto)
  }

  @Post('characters')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create new character' })
  @ApiParam({ name: 'characterId', description: 'Character ID' })
  @ApiResponse({
    status: 201,
    description: 'ID of created character',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'integer',
        },
      },
    }
  })
  async createCharacter(
    @Body() dto: CreateOrUpdateCharacterDto,
  ) {
    return this.charactersRepository.create(dto)
  }

  @Delete('characters/:characterId')
  @ApiOperation({ summary: 'Delete character' })
  @ApiResponse({
    status: 200
  })
  async deleteCharacter(
    @Param('characterId', ParseIntPipe) id: number,) {
    return this.charactersRepository.delete(id)
  }
}
