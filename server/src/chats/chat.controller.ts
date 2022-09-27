import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RequestUser } from 'src/auth/requestUser';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('rooms')
  async getRooms(@Req() request: RequestUser, @Res() response: Response) {
    const rooms = await this.chatService.getRoomsOfUser(request.user.userId);
    return response.status(HttpStatus.OK).json({ rooms });
  }

  @Post('get-mssgs')
  async getChat(@Res() response: Response, @Body('roomId') roomId: string) {
    const chat = await this.chatService.getChatofRoom(roomId);
    if (!chat[0]._id) {
      return response
        .status(HttpStatus.FORBIDDEN)
        .json({ message: chat[0].message });
    }
    return response.status(HttpStatus.OK).json({ chat });
  }

  @Get()
  getHello(): string {
    return this.chatService.getHello();
  }
}
