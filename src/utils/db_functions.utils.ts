import { SelectQueryBuilder } from 'typeorm';
import { Filter, Filters, Sort } from './types';

export class DbFuncs {
  paginate(query: SelectQueryBuilder<any>, page: number, limit: number) {
    const offset = page * limit;
    return query.skip(offset).take(limit);
  }

  filter(query: SelectQueryBuilder<any>, filters: Filters) {
    filters.forEach((filter: Filter) => {
      switch (filter.operator) {
        case 'equals':
          query.andWhere(`${filter.field} = :value`, {
            value: filter.value,
          });
          break;
        case 'not':
          query.andWhere(`${filter.field} != :value`, {
            value: filter.value,
          });
          break;
        case 'gt':
          query.andWhere(`${filter.field} > :value`, {
            value: filter.value,
          });
          break;
        case 'gte':
          query.andWhere(`${filter.field} >= :value`, {
            value: filter.value,
          });
          break;
        case 'lt':
          query.andWhere(`${filter.field} < :value`, {
            value: filter.value,
          });
          break;
        case 'lte':
          query.andWhere(`${filter.field} <= :value`, {
            value: filter.value,
          });
          break;
        case 'like':
          query.andWhere(`${filter.field} LIKE :value`, {
            value: `%${filter.value}%`,
          });
          break;
        case 'in':
          query.andWhere(`${filter.field} IN (:...values)`, {
            values: filter.value,
          });
          break;
        case 'notIn':
          query.andWhere(`${filter.field} NOT IN (:...values)`, {
            values: filter.value,
          });
          break;
        case 'isNull':
          query.andWhere(`${filter.field} IS NULL`);
          break;
        case 'isNotNull':
          query.andWhere(`${filter.field} IS NOT NULL`);
          break;
        default:
          throw new Error(`Unknown filter operator: ${filter.operator}`);
      }
    });
    return query;
  }

  sort(query: SelectQueryBuilder<any>, sort: Sort[]) {
    sort.forEach((el: Sort) => {
      query.orderBy(el.field, el.order);
    });

    return query;
  }
}
