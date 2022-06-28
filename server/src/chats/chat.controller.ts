import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('rooms')
  async getRooms(@Res() response: Response, @Body('userId') userId: string) {
    const rooms = await this.chatService.getRoomsOfUser(userId);
    return response.status(HttpStatus.CREATED).json({ rooms });
  }

  @Post('get-mssgs')
  async getChat(@Res() response: Response, @Body('roomId') roomId: string) {
    const chat = await this.chatService.getChatofRoom(roomId);
    return response.status(HttpStatus.OK).json({ chat });
  }

  @Get()
  getHello(): string {
    return this.chatService.getHello();
  }
}
