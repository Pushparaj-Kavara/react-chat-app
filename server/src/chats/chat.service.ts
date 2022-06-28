import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Room, RoomDocument } from 'src/rooms/schemas/room.schema';
import { Message, MessageDocument } from 'src/messages/schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async getRoomsOfUser(userId: string): Promise<RoomDocument[]> {
    return await this.roomModel
      .find({
        $or: [
          { user1: new Types.ObjectId(userId) },
          { user2: new Types.ObjectId(userId) },
        ],
      })
      .exec();
  }

  async getChatofRoom(roomId: string): Promise<MessageDocument[]> {
    const room = await this.roomModel.findById(roomId).exec();
    const query = {
      $or: [
        { sender: room.user1, receiver: room.user2 },
        { sender: room.user2, receiver: room.user1 },
      ],
    };
    const chat = await this.messageModel
      .find(query)
      .sort({ time: 'desc' })
      .exec();
    return chat;
  }

  getHello(): string {
    return 'Welcome to Chat Service Backend';
  }
}
