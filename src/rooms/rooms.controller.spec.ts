import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomService } from './rooms.service';
import { InsertRoomsDto, QueryRoomsDto } from './room.dto';
import { Rooms } from './rooms.entity';

const mockRoomService = () => ({
  queryRooms: jest.fn(),
  insertRooms: jest.fn(),
});

describe('RoomsController', () => {
  let controller: RoomsController;
  let service: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [{ provide: RoomService, useFactory: mockRoomService }],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
    service = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRooms', () => {
    it('should return rooms based on query parameters', async () => {
      const queryRoomsDto: QueryRoomsDto = {
        page: 1,
        limit: 2,
        filters: [{ field: 'userId', value: 1, operator: 'equals' }],
        sort: [{ field: 'capacity', order: 'DESC' }],
      };

      const result = ['room1', 'room2'];
      //@ts-expect-error
      jest.spyOn(service, 'queryRooms').mockResolvedValue(result);

      const response = await controller.getRooms(
        queryRoomsDto.page,
        queryRoomsDto.limit,
        queryRoomsDto.filters,
        queryRoomsDto.sort,
      );

      expect(service.queryRooms).toHaveBeenCalledWith(queryRoomsDto);
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

      jest.spyOn(service, 'insertRooms').mockResolvedValue(mockSavedRooms);

      const response = await controller.insertRooms(insertRoomsDto);

      expect(service.insertRooms).toHaveBeenCalledWith(insertRoomsDto);
      expect(response).toEqual(mockSavedRooms);
    });
  });
});
