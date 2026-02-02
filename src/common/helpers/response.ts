import { Meta, PaginatedData } from '../interfaces/api-response';

export function createPaginatedResponse<T>(
  items: T[],
  meta: Meta,
): PaginatedData<T> {
  return {
    items,
    meta,
  };
}
