import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";


export class NewRecipeDto {

            @IsString()
            title: string;

            @IsString()
            tipo: string;

            @IsString()
            preparacion: string;
          
            @IsString()
            tiempoCoccion: string;

            @IsString()
            grados: string;

            @IsString()
            tiempoElaboracion: string;

            @IsString()
            tiempoTotal: string;
            
            @IsString()
            alt_image?: string;
}