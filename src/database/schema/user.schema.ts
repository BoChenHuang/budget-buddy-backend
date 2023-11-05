import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop([mongoose.Schema.Types.ObjectId])
    ledgers: mongoose.Schema.Types.ObjectId[];

    @Prop()
    setting: mongoose.Schema.Types.ObjectId;

    @Prop({default: Date.now})
    createAt: Date;

    @Prop({default: Date.now})
    updateAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);