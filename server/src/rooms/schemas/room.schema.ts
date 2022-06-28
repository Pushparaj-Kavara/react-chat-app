import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user1: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user2: Types.ObjectId;

  @Prop({ required: true })
  time: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
