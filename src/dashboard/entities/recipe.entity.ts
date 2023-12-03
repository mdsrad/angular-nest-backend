import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Recipe {

            _id?: string;

            @Prop({ unique: true, required: true })
            title: string;

            @Prop({ required: true })
            tipo: string;

            @Prop({ required: true })
            preparacion: string;

            @Prop({ required: true })
            tiempoCoccion: string;

            @Prop({ required: true })
            grados: string;

            @Prop({ required: true })
            tiempoElaboracion: string;

            @Prop({ required: true })
            tiempoTotal: string;

            @Prop()
            alt_image?: string;

            // @Prop({ type: [ String ] }) // [user, admin, ...]
            // ingredientes: string[];
}
export const RecipeSchema = SchemaFactory.createForClass( Recipe );

