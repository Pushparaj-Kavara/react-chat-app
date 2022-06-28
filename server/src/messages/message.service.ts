import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    createMessageDto.time = Date.now();
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
