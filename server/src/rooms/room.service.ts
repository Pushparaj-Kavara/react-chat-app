import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    createRoomDto.time = Date.now();
    const createdRoom = new this.roomModel(createRoomDto);
    return createdRoom.save();
  }

  async getAll(): Promise<Room[]> {
    return await this.roomModel.find().exec();
  }

  async getById(id: string): Promise<Room> {
    return await this.roomModel.findById(id).exec();
  }

  async update(id: string, message: CreateRoomDto): Promise<Room> {
    return await this.roomModel.findByIdAndUpdate(id, message, {
      new: true,
    });
  }

  async delete(id: string): Promise<any> {
    return await this.roomModel.findByIdAndDelete(id);
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
