import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './entities/recipe.entity';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
      name: Recipe.name,
      schema: RecipeSchema,
      }
    ]),
  ]
})
export class DashboardModule {}
