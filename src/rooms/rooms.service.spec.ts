import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './rooms.service';
import { InsertRoomsDto, QueryRoomsDto } from './room.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Rooms } from './rooms.entity';
import { DbFuncs } from 'src/utils/db_functions.utils';

const mockQueryBuilder = {
  andWhere: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  take: jest.fn().mockReturnThis(),
  getMany: jest.fn().mockResolvedValue(['room1', 'room2']),
};

const mockRoomRepo = {
  createQueryBuilder: jest.fn(() => mockQueryBuilder),
  save: jest.fn(),
};

describe('RoomService', () => {
  let service: RoomService;
  let dbFunctions: DbFuncs;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        { provide: getRepositoryToken(Rooms), useValue: mockRoomRepo },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('queryRooms', () => {
    it('should return rooms based on query parameters', async () => {
      const queryRoomsDto: QueryRoomsDto = {
        page: 1,
        limit: 2,
        //@ts-expect-error
        filters: JSON.stringify([
          { field: 'userId', value: 1, operator: 'equals' },
        ]),
        //@ts-expect-error
        sort: JSON.stringify([{ field: 'capacity', order: 'DESC' }]),
      };

      const result = ['room1', 'room2'];

      const response = await service.queryRooms(queryRoomsDto);
      console.log(response);

      expect(mockRoomRepo.createQueryBuilder).toHaveBeenCalledWith(Rooms.name);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'userId = :value',
        {
          value: 1,
        },
      );
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('capacity', 'DESC');
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(2);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(2);
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });

  describe('insertRooms', () => {
    it('should insert rooms and return them', async () => {
      const insertRoomsDto: InsertRoomsDto = {
        rooms: [
          { id: 1, name: 'Conference Room A', capacity: 10, userId: 1 },
          { id: 2, name: 'Meeting Room B', capacity: 8, userId: 2 },
        ],
      };

      const mockSavedRooms = [
        { id: 1, name: 'Conference Room A', capacity: 10, userId: 1 },
        { id: 2, name: 'Meeting Room B', capacity: 8, userId: 2 },
      ];

      mockRoomRepo.save.mockResolvedValue(mockSavedRooms);

      const response = await service.insertRooms(insertRoomsDto);

      expect(mockRoomRepo.save).toHaveBeenCalledWith(insertRoomsDto.rooms);
      expect(response).toEqual(mockSavedRooms);
    });
  });
});
