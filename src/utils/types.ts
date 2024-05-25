export type Order = 'ASC' | 'DESC';
export type Sort = { field: string; order: Order };
export type Filter = { field: string; value: any; operator: string };
export type Filters = Array<Filter>;
