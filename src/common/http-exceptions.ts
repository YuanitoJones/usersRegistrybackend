import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message;
    const code = exception.code; // SQL Server / Postgres error codes

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let customMessage = 'Internal Database Error';

    // Handle specific SQL Server/Database codes
    if (message.includes('conflicted with the REFERENCE constraint')) {
      status = HttpStatus.CONFLICT;
      customMessage =
        'This record is being used elsewhere and cannot be deleted.';
    }

    if (message.includes('Duplicate entry') || code === '23505') {
      status = HttpStatus.CONFLICT;
      customMessage = 'Record already exists.';
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: customMessage,
      detail: message, // Only show detail in development mode!
    });
  }
}
