# Pagination, Filtering, and Sorting Utility Module For Advtyzl-Take-Home-Challenge

## Overview

The codebase implements and offers utility class methods / functions for applying pagination, filtering, and sorting to TypeORM query builders in a Nest.js application.

## Class

The **DbFuncs** class offers these: pagination, filtering, and sorting functions as class methods.

### paginate(query: SelectQueryBuilder<any>, page, limit)
This method applies pagination to the query builder.
*Note* page starts from `0` **i.e** to retrieve page 1 you would pass `0` as value

**Parameters:**
- `query`: The TypeORM query builder instance.
- `page`: The current page number (starting from 0).
- `limit`: The limit of items to return for a page.

### sort(query: SelectQueryBuilder<any>, sort: Sort[])
This method applies sorting to the query builder.

**Parameters:**
- `query`: The TypeORM query builder instance.
- `sort`: An array of type `SORT`, **SORT** is an object that accepts the fields:  `field` and `order` (`ASC` or `DESC`).

### filter(query: SelectQueryBuilder<any>, filters: any[])
This  method applies filtering to the query builder.

**Parameters:**
- `query`: The TypeORM query builder instance.
- `filters`: An array of filter objects, each object contains a `field`, `value`, and `operator`.

**Supported Operators:**
- `equals`
- `not`
- `gt` (greater than)
- `gte` (greater than or equal)
- `lt` (less than)
- `lte` (less than or equal)
- `like`
- `in`
- `notIn`
- `isNull`
- `isNotNull`

## Usage

1. Import and instantiate the utility class `DbFuncs` in your service class.
2. Call the class-methods with appropriate parameters to get desired results as seen below:

```typescript
import { DbFuncs } from 'src/utils/db_functions.utils';

export class RoomService {
  private dbFunctions: DbFuncs;
  
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
}
```

## Running Server Locally

```bash
yarn start:dev
```

## Running Test Cases

```bash
yarn test
```

## Postman Documentation
 [link](https://www.postman.com/solar-astronaut-970547/workspace/my-public-workspace/collection/27713261-e4782a5b-18de-444c-a620-6e312afee7fb?action=share&creator=27713261)

## Deployment

- Deploy on any hosting service provider of your choice.