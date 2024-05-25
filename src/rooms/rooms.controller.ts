import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RoomService } from './rooms.service';
import { InsertRoomsDto, Sort } from './room.dto';
import { Rooms } from './rooms.entity';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getRooms(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('filters') filters: any[],
    @Query('sort') sort: Sort[],
  ) {
    return this.roomService.queryRooms({ filters, limit, page, sort });
  }

  @Post()
  async insertRooms(@Body() dto: InsertRoomsDto): Promise<Rooms[]> {
    return this.roomService.insertRooms(dto);
  }
}
