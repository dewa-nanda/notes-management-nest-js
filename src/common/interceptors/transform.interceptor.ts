import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { ApiResponse, PaginatedData } from '../interfaces/api-response';

function isPaginatedData<T>(data: unknown): data is PaginatedData<T> {
  return (
    typeof data === 'object' &&
    data !== null &&
    'items' in data &&
    'meta' in data
  );
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const message =
      this.reflector.get<string>('responseMessage', context.getHandler()) ??
      'Success';

    const response = context.switchToHttp().getResponse<Response>();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        if (isPaginatedData<T>(data)) {
          return {
            statusCode,
            message,
            data: data.items as T,
            meta: data.meta,
          };
        }

        return {
          statusCode,
          message,
          data: data as T,
        };
      }),
    );
  }
}
