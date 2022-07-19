import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, user: CreateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<any> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async getByCondition(condition: object): Promise<User> {
    return await this.userModel.findOne(condition).exec();
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
