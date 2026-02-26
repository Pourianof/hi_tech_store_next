export interface PagedResults<T> {
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  items: T[];
}
