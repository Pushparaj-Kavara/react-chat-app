import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  All,
  Res,
  Req,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MessagesService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { RequestUser } from '../auth/requestUser';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('create')
  async createMessage(
    @Req() request: RequestUser,
    @Res() response: Response,
    @Body() createMessage: CreateMessageDto,
  ) {
    createMessage.sender = request.user.userId;
    const newMessage = await this.messagesService.create(createMessage);
    if (!newMessage._id) {
      return response
        .status(HttpStatus.FORBIDDEN)
        .json({ message: newMessage.message });
    }
    return response
      .status(HttpStatus.CREATED)
      .json({ message: 'New Message Created.', newMessage });
  }

  @Get('all')
  async getAllMessages(@Res() response: Response) {
    const messages = await this.messagesService.getAll();
    return response.status(HttpStatus.OK).json({ messages });
  }

  @Get(':id')
  async getMessageById(@Res() response: Response, @Param('id') id: string) {
    const message = await this.messagesService.getById(id);
    return response.status(HttpStatus.OK).json({ message });
  }

  @Put(':id')
  async updateMessage(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateMessage: CreateMessageDto,
  ) {
    const updatedMessage = await this.messagesService.update(id, updateMessage);
    return response.status(HttpStatus.OK).json({ updatedMessage });
  }

  @Delete(':id')
  async deleteMessage(@Res() response: Response, @Param('id') id: string) {
    const deletedMessage = await this.messagesService.delete(id);
    return response.status(HttpStatus.OK).json({ deletedMessage });
  }

  @All()
  getHello(): string {
    return this.messagesService.default();
  }
}
