import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Category {
    @Prop()
    name: string;

    @Prop()
    icon: string;

    @Prop({default: Date.now})
    createAt: Date;

    @Prop({default: Date.now})
    updateAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);