import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { NewRecipeDto } from './dto/new-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('/new-recipe')
  create(@Body() newRecipeDto: NewRecipeDto) {
    return this.dashboardService.create( newRecipeDto );
  }

  @Get('/list')
  findAll(req: Request) {
    const recipe = req['recipe'] as Recipe;
    return recipe;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDashboardDto: UpdateDashboardDto) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  }
}
