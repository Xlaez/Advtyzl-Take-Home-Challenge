import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './rooms.entity';
import { InsertRoomsDto, QueryRoomsDto } from './room.dto';
import { DbFuncs } from 'src/utils/db_functions.utils';

@Injectable()
export class RoomService {
  private dbFunctions: DbFuncs;

  constructor(@InjectRepository(Room) private roomRepo: Repository<Room>) {
    this.dbFunctions = new DbFuncs();
  }

  async queryRooms(dto: QueryRoomsDto) {
    let queryBuilder = this.roomRepo.createQueryBuilder(Room.name);

    if (dto.filters[0].field) {
      queryBuilder = this.dbFunctions.filter(queryBuilder, dto.filters);
    }

    if (dto.sort[0].field) {
      queryBuilder = this.dbFunctions.sort(queryBuilder, dto.sort);
    }

    queryBuilder = this.dbFunctions.pagination(
      queryBuilder,
      dto.page,
      dto.limit,
    );

    return queryBuilder.getMany();
  }

  async insertRooms(dto: InsertRoomsDto) {
    return this.roomRepo.save(dto.rooms);
  }
}
