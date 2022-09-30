import { ApiProperty } from "@nestjs/swagger";

export class Episode {
  @ApiProperty()
  name: string;
}
