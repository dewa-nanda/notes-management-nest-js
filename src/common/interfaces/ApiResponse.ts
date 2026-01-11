export interface Meta {
  currentPage: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  meta?: Meta;
}

export interface PaginatedData<T> {
  items: T[];
  meta: Meta;
}
