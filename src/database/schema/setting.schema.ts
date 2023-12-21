import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Setting {
    @Prop({type: [mongoose.Schema.Types.ObjectId], ref: 'Category'})
    categories: mongoose.Schema.Types.ObjectId[];

    @Prop({default: Date.now})
    createAt: Date;

    @Prop({default: Date.now})
    updateAt: Date;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);