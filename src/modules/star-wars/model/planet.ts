import { ApiProperty } from '@nestjs/swagger';

export class Planet {
  @ApiProperty()
  name: string
}
