import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { MessagesModule } from './messages/message.module';
import { RoomsModule } from './rooms/room.module';
import { ChatModule } from './chats/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/chatdb'),
    UsersModule,
    MessagesModule,
    RoomsModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
