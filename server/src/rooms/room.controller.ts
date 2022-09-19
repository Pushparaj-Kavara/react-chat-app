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
import { Response } from 'express';
import { RoomsService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { RequestUser } from 'src/auth/requestUser';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('create')
  async createRoom(
    @Req() request: RequestUser,
    @Res() response: Response,
    @Body() createRoom,
  ) {
    const createRoomData: CreateRoomDto = {
      user1: request.user.userId,
      user2: createRoom.username,
      time: Date.now(),
    };
    const newRoom = await this.roomsService.create(createRoomData);
    if (!newRoom._id) {
      return response
        .status(HttpStatus.FORBIDDEN)
        .json({ message: newRoom.message });
    }
    return response
      .status(HttpStatus.CREATED)
      .json({ message: 'New Room Created.', newRoom });
  }

  @Get('all')
  async getAllRooms(@Res() response: Response) {
    const rooms = await this.roomsService.getAll();
    return response.status(HttpStatus.OK).json({ rooms });
  }

  @Get('me')
  async getRoomById(@Req() request: RequestUser, @Res() response: Response) {
    const room = await this.roomsService.getById(request.user.userId);
    return response.status(HttpStatus.OK).json({ room });
  }

  @Put('me')
  async updateRoom(
    @Req() request: RequestUser,
    @Res() response: Response,
    @Body() updateRoom: CreateRoomDto,
  ) {
    const updatedRoom = await this.roomsService.update(
      request.user.userId,
      updateRoom,
    );
    return response.status(HttpStatus.OK).json({ updatedRoom });
  }

  @Delete('me')
  async deleteRoom(@Req() request: RequestUser, @Res() response: Response) {
    const deletedRoom = await this.roomsService.delete(request.user.userId);
    return response.status(HttpStatus.OK).json({ deletedRoom });
  }

  @All()
  getHello(): string {
    return this.roomsService.default();
  }
}
