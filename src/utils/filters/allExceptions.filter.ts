// filters/all-exceptions.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ControllerResponse } from 'src/types/interfaces';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger('CATCH');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse: ControllerResponse<any> = {
      success: false,
      code: status,
      error: {
        msg: 'Internal server error',
      },
    };

    if (exception?.response) {
      const { message, error, statusCode } = exception.response;
      errorResponse.code = statusCode || status;
      errorResponse.error.msg = message || 'Internal server error';
      this.logger.error(`[${error || 'Error Desconocido'}] - ${message || ''}\n`);
    } else {
      this.logger.error(`[Error Desconocido] - ${exception.message || ''}\n`);
    }

    response.status(errorResponse.code).json(errorResponse);
  }
}
