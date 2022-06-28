import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  All,
  Res,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async createUser(
    @Res() response: Response,
    @Body() createUser: CreateUserDto,
  ) {
    const newUser = await this.usersService.create(createUser);
    return response.status(HttpStatus.CREATED).json({ newUser });
  }

  @Get('all')
  async getAllUsers(@Res() response: Response) {
    const users = await this.usersService.getAll();
    return response.status(HttpStatus.OK).json({ users });
  }

  @Get(':id')
  async getUserById(@Res() response: Response, @Param('id') id: string) {
    const user = await this.usersService.getById(id);
    return response.status(HttpStatus.OK).json({ user });
  }

  @Put(':id')
  async updateUser(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateUser: CreateUserDto,
  ) {
    const updatedUser = await this.usersService.update(id, updateUser);
    return response.status(HttpStatus.OK).json({ updatedUser });
  }

  @Delete(':id')
  async deleteUser(@Res() response: Response, @Param('id') id: string) {
    const deletedUser = await this.usersService.delete(id);
    return response.status(HttpStatus.OK).json({ deletedUser });
  }

  @All()
  getHello(): string {
    return this.usersService.default();
  }
}
