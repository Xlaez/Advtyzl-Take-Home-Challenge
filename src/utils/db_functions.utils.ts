import { SelectQueryBuilder } from 'typeorm';
import { Filter, Filters, Sort } from './types';

export class DbFuncs {
  paginate(query: SelectQueryBuilder<any>, page: number, limit: number) {
    const offset = page * limit;
    return query.skip(offset).take(limit);
  }

  filter(query: SelectQueryBuilder<any>, filters: Filters) {
    filters.forEach((filter: Filter) => {
      const field = `"${filter.field}"`;

      switch (filter.operator) {
        case 'equals':
          query.andWhere(`${field} = :value`, {
            value: filter.value,
          });
          break;
        case 'not':
          query.andWhere(`${field} != :value`, {
            value: filter.value,
          });
          break;
        case 'gt':
          query.andWhere(`${field} > :value`, {
            value: filter.value,
          });
          break;
        case 'gte':
          query.andWhere(`${field} >= :value`, {
            value: filter.value,
          });
          break;
        case 'lt':
          query.andWhere(`${field} < :value`, {
            value: filter.value,
          });
          break;
        case 'lte':
          query.andWhere(`${field} <= :value`, {
            value: filter.value,
          });
          break;
        case 'like':
          query.andWhere(`${field} LIKE :value`, {
            value: `%${filter.value}%`,
          });
          break;
        case 'in':
          query.andWhere(`${field} IN (:...values)`, {
            values: filter.value,
          });
          break;
        case 'notIn':
          query.andWhere(`${field} NOT IN (:...values)`, {
            values: filter.value,
          });
          break;
        case 'isNull':
          query.andWhere(`${field} IS NULL`);
          break;
        case 'isNotNull':
          query.andWhere(`${field} IS NOT NULL`);
          break;
        default:
          throw new Error(`Unknown filter operator: ${filter.operator}`);
      }
    });
    return query;
  }

  sort(query: SelectQueryBuilder<any>, sort: Sort[]) {
    sort.forEach((el: Sort) => {
      const field = `"${el.field}"`;
      query.orderBy(field, el.order);
    });

    return query;
  }
}
