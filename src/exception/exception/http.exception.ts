import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message;

    if (exception instanceof Error) {
      message = {
        //@ts-expect-error
        message: exception.response
          ? //@ts-expect-error
            exception.response.message
          : exception.message,
        status: status ? status : HttpStatus.INTERNAL_SERVER_ERROR,
      };
    } else {
      message = {
        message:
          exception instanceof HttpException
            ? exception.getResponse()
            : 'Internal server error',
      };
    }

    response.status(status).json(message);
  }
}
