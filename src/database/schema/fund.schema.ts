import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Found {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Ledger" })
    ledgerId: mongoose.Schema.Types.ObjectId;

    @Prop()
    deposit: number;
     
    @Prop({default: Date.now})
    createAt: Date;

    @Prop({default: Date.now})
    updateAt: Date;
}

export const FoundSchema = SchemaFactory.createForClass(Found);