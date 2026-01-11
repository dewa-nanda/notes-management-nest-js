import { Meta, PaginatedData } from '../interfaces/ApiResponse';

export function createPaginatedResponse<T>(
  items: T[],
  meta: Meta,
): PaginatedData<T> {
  return {
    items,
    meta,
  };
}
