import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Order } from 'src/utils/types';

export class Sort {
  @IsString()
  @IsNotEmpty()
  field: string;

  @IsString()
  @IsNotEmpty()
  order: Order;
}

export class QueryRoomsDto {
  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;

  @IsArray()
  @IsOptional()
  filters: any[];

  @Type(() => Array<Sort>)
  @IsOptional()
  sort: Sort[];
}

export class RoomDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  capacity: number;

  @IsNumber()
  userId: number;
}

export class InsertRoomsDto {
  @Type(() => RoomDto)
  @IsNotEmpty()
  rooms: RoomDto[];
}
