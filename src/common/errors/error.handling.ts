import {
  Logger,
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { timestamp } from 'rxjs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message
              : (exception as any)?.message || 'Internal server error';
      const stack = (exception as any)?.stack || "";
      this.logger.error(`Status: ${status} Error: ${message}`, stack);
      response.status(status).json({
          statusCode: status,
          message,
          timestamp: new Date().toISOString(),
          path: request.url
      })
  }
}
