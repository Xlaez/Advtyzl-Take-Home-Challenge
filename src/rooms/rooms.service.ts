import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rooms } from './rooms.entity';
import { InsertRoomsDto, QueryRoomsDto } from './room.dto';
import { DbFuncs } from 'src/utils/db_functions.utils';

@Injectable()
export class RoomService {
  private dbFunctions: DbFuncs;
  private readonly logger = new Logger(RoomService.name);

  constructor(@InjectRepository(Rooms) private roomRepo: Repository<Rooms>) {
    this.dbFunctions = new DbFuncs();
  }

  async queryRooms(dto: QueryRoomsDto) {
    let queryBuilder = this.roomRepo.createQueryBuilder(Rooms.name);

    const sort = JSON.parse(dto.sort as any) as any[];
    const filters = JSON.parse(dto.filters as any) as any[];

    if (filters.length) {
      queryBuilder = this.dbFunctions.filter(queryBuilder, filters);
    }

    if (sort.length) {
      queryBuilder = this.dbFunctions.sort(queryBuilder, sort);
    }

    queryBuilder = this.dbFunctions.paginate(queryBuilder, dto.page, dto.limit);

    return queryBuilder.getMany();
  }

  async insertRooms(dto: InsertRoomsDto) {
    return this.roomRepo.save(dto.rooms);
  }
}
