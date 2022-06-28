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
import { Response } from 'express';
import { RoomsService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('create')
  async createRoom(
    @Res() response: Response,
    @Body() createRoom: CreateRoomDto,
  ) {
    const newRoom = await this.roomsService.create(createRoom);
    return response.status(HttpStatus.CREATED).json({ newRoom });
  }

  @Get('all')
  async getAllRooms(@Res() response: Response) {
    const rooms = await this.roomsService.getAll();
    return response.status(HttpStatus.OK).json({ rooms });
  }

  @Get(':id')
  async getRoomById(@Res() response: Response, @Param('id') id: string) {
    const room = await this.roomsService.getById(id);
    return response.status(HttpStatus.OK).json({ room });
  }

  @Put(':id')
  async updateRoom(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateRoom: CreateRoomDto,
  ) {
    const updatedRoom = await this.roomsService.update(id, updateRoom);
    return response.status(HttpStatus.OK).json({ updatedRoom });
  }

  @Delete(':id')
  async deleteRoom(@Res() response: Response, @Param('id') id: string) {
    const deletedRoom = await this.roomsService.delete(id);
    return response.status(HttpStatus.OK).json({ deletedRoom });
  }

  @All()
  getHello(): string {
    return this.roomsService.default();
  }
}
