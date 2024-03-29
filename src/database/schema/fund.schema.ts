import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Fund {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ledger' })
  ledgerId: mongoose.Schema.Types.ObjectId;

  @Prop()
  lock: boolean;

  @Prop()
  deposit: number;

  @Prop({ default: Date.now })
  createAt: Date;

  @Prop({ default: Date.now })
  updateAt: Date;
}

export const FundSchema = SchemaFactory.createForClass(Fund);
