import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './entities/recipe.entity';
import { Model } from 'mongoose';
import { NewRecipeDto } from './dto/new-recipe.dto';

@Injectable()
export class DashboardService {

  constructor(
    @InjectModel( Recipe.name ) 
    private recipeModel: Model<Recipe>,
  ) {}


  async create(createRecipeDto: NewRecipeDto): Promise<Recipe> {
    try {

      const { ...recipeData } = createRecipeDto;
      const newURecipe = new this.recipeModel( {
        ...recipeData
      } );
      await newURecipe.save();

      return recipeData;

    } catch (error) {
      throw new InternalServerErrorException('Ocurrio algo terrible :(');
    }
  }

  async addRecipe( createRecipeDto: NewRecipeDto){
    await this.create( createRecipeDto );
  }

  findAll(): Promise<Recipe[]> {
    return this.recipeModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
