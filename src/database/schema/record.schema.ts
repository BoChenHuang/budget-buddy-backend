import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Record {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Ledger" })
    ledgerId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Currency" })
    currency: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
    categories: mongoose.Schema.Types.ObjectId[];

    @Prop()
    description: string;

    @Prop({type: String, required: true, enum: ["income", " expenditure", "transfer"]})
    type: string;

    @Prop({type: String, required: true, enum: ["Found", " CreditCard"]})
    sourceType: string;

    @Prop({refPath: "sourceType"})
    source: mongoose.Schema.Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Found" })
    destination: mongoose.Schema.Types.ObjectId;

    @Prop()
    amount: string;
     
    @Prop({default: Date.now})
    createAt: Date;

    @Prop({default: Date.now})
    updateAt: Date;
}

export const RecordCardSchema = SchemaFactory.createForClass(Record);