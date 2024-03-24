import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class CreditCard {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ledger' })
  ledgerId: mongoose.Schema.Types.ObjectId;

  @Prop()
  lock: boolean;

  @Prop()
  limit: number;

  @Prop()
  statementClosingDate: Date;

  @Prop()
  dueDate: Date;

  @Prop({ default: Date.now })
  createAt: Date;

  @Prop({ default: Date.now })
  updateAt: Date;
}

export const CreditCardSchema = SchemaFactory.createForClass(CreditCard);
