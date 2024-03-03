import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Currency {
    @Prop()
    name: string;

    @Prop()
    exchangeRate: number;

    @Prop({default: Date.now})
    createAt: Date;

    @Prop({default: Date.now})
    updateAt: Date;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);