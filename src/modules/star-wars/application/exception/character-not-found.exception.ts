import { NotFoundException } from "@nestjs/common";

export class CharacterNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(null, `Character of id ${id} not found`);
  }
}
