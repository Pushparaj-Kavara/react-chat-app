import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  All,
  Res,
  Body,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { RequestUser } from 'src/auth/requestUser';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(
    @Res() response: Response,
    @Body() createUser: CreateUserDto,
  ) {
    const newUser = await this.usersService.create(createUser);
    return response.status(HttpStatus.CREATED).json({ newUser });
  }

  @Get('all')
  async getAllUsers(@Req() request: Request, @Res() response: Response) {
    const users = await this.usersService.getAll();
    return response.status(HttpStatus.OK).json({ users });
  }

  @Get('me')
  async getUserById(@Req() request: RequestUser, @Res() response: Response) {
    const user = await this.usersService.getById(request.user.userId);
    return response.status(HttpStatus.OK).json({ user });
  }

  @Put('me')
  async updateUser(
    @Req() request: RequestUser,
    @Res() response: Response,
    @Body() updateUser: CreateUserDto,
  ) {
    const updatedUser = await this.usersService.update(
      request.user.userId,
      updateUser,
    );
    return response.status(HttpStatus.OK).json({ updatedUser });
  }

  @Delete('me')
  async deleteUser(@Req() request: RequestUser, @Res() response: Response) {
    const deletedUser = await this.usersService.delete(request.user.userId);
    return response.status(HttpStatus.OK).json({ deletedUser });
  }

  @All()
  getHello(): string {
    return this.usersService.default();
  }
}
