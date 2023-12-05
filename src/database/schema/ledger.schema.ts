import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Ledger {
    @Prop({ required: true })
    name: string;

    @Prop()
    image: string;

    @Prop()
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    owner: mongoose.Schema.Types.ObjectId;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "User" })
    collaborators: mongoose.Schema.Types.ObjectId[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Currency" })
    currency: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Theme" })
    theme: mongoose.Schema.Types.ObjectId;

    @Prop({ default: Date.now })
    createAt: Date;

    @Prop({ default: Date.now })
    updateAt: Date;
}

export const LedgerSchema = SchemaFactory.createForClass(Ledger);