import { Module } from '@nestjs/common';
import { RoomService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from './rooms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms])],
  providers: [RoomService],
  controllers: [RoomsController],
})
export class RoomsModule {}
