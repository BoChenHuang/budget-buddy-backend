import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Record {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Ledger" })
    ledgerId: mongoose.Schema.Types.ObjectId;

    @Prop({default: Date.now})
    date: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Currency" })
    currency: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
    categories: mongoose.Schema.Types.ObjectId[];

    @Prop()
    description: string;

    @Prop({type: String, required: true, enum: ["income", "expenditure", "transfer"]})
    type: string;

    @Prop({type: String, enum: ["Fund", "CreditCard"]})
    sourceType: string;

    @Prop({refPath: "sourceType"})
    source: mongoose.Schema.Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Fund" })
    destination: mongoose.Schema.Types.ObjectId;

    @Prop()
    amount: number;
     
    @Prop({default: Date.now})
    createAt: Date;

    @Prop({default: Date.now})
    updateAt: Date;
}

export const RecordSchema = SchemaFactory.createForClass(Record);