import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<any> {
    const user2 = await this.userModel
      .findOne({ username: createRoomDto.user2 })
      .exec();
    if (!user2) {
      return { _id: null, message: 'No such User present' };
    }
    createRoomDto.user2 = user2._id;
    const alreadyPresent = await this.roomModel.findOne({
      $or: [
        { user1: createRoomDto.user1, user2: createRoomDto.user2 },
        { user1: createRoomDto.user2, user2: createRoomDto.user1 },
      ],
    });
    if (alreadyPresent) {
      // already present
      return { _id: null, message: 'Room already present' };
    }
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
