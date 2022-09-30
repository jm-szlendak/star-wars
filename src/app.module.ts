import { Module } from '@nestjs/common';
import { StarWarsModule } from './modules/star-wars/star-wars.module';

@Module({
  imports: [
    StarWarsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
