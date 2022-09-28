import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { Room, RoomDocument } from 'src/rooms/schemas/room.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<any> {
    createMessageDto.time = Date.now();
    const receiverRoom = await this.roomModel.findOne({
      $or: [
        { user1: createMessageDto.sender, user2: createMessageDto.receiver },
        { user1: createMessageDto.receiver, user2: createMessageDto.sender },
      ],
    });
    if (!receiverRoom) {
      return {
        _id: null,
        message: "Room doesn't exist between sender and receiver!",
      };
    }
    if (!createMessageDto.text) {
      return { _id: null, message: 'Message text should not be empty!' };
    }
    const createdMessage = new this.messageModel(createMessageDto);
    return createdMessage.save();
  }

  async getAll(): Promise<Message[]> {
    return await this.messageModel.find().exec();
  }

  async getById(id: string): Promise<Message> {
    return await this.messageModel.findById(id).exec();
  }

  async update(id: string, message: CreateMessageDto): Promise<Message> {
    return await this.messageModel.findByIdAndUpdate(id, message, {
      new: true,
    });
  }

  async delete(id: string): Promise<any> {
    return await this.messageModel.findByIdAndDelete(id);
  }

  default(): string {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'No such API Exists :(',
      },
      HttpStatus.FORBIDDEN,
    );
    return 'This is Users Service! :) Wrong API';
  }
}
