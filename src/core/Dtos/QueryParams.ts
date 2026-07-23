export type QueryParams<T = object> = {
  page?: number;
  limit?: number;
} & T;
