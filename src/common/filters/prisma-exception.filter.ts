import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientInitializationError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorCode: string | undefined;

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const errorResponse = this.handleKnownError(exception);
      status = errorResponse.status;
      message = errorResponse.message;
      errorCode = exception.code;
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Validation error';
      this.logger.error('Prisma Validation Error', exception.message);
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Unknown database error';
      this.logger.error('Prisma Unknown Error', exception.message);
    } else if (exception instanceof Prisma.PrismaClientInitializationError) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = 'Database connection error';
      this.logger.error('Prisma Initialization Error', exception.message);
    } else {
      this.logger.error('Unexpected error', exception);
    }

    response.status(status).json({
      statusCode: status,
      message,
      ...(errorCode && { error: errorCode }),
      timestamp: new Date().toISOString(),
    });
  }

  private handleKnownError(error: Prisma.PrismaClientKnownRequestError): {
    status: HttpStatus;
    message: string;
  } {
    const errorMap: Record<string, { status: HttpStatus; message: string }> = {
      P2000: {
        status: HttpStatus.BAD_REQUEST,
        message: 'Value too long for column',
      },
      P2001: {
        status: HttpStatus.NOT_FOUND,
        message: 'Record does not exist',
      },
      P2002: {
        status: HttpStatus.CONFLICT,
        message: 'Unique constraint violation',
      },
      P2003: {
        status: HttpStatus.BAD_REQUEST,
        message: 'Foreign key constraint failed',
      },
      P2025: {
        status: HttpStatus.NOT_FOUND,
        message: 'Record not found',
      },
    };

    this.logger.error(
      `Prisma Error [${error.code}]: ${error.message}`,
      error.stack,
    );

    return (
      errorMap[error.code] || {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Database error',
      }
    );
  }
}
