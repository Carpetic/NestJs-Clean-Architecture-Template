import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionMessage } from 'src/domain/entities/Exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: any;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            if (status === HttpStatus.BAD_REQUEST && this.isValidationErrorResponse(exception.getResponse())) {
                const error = exception.getResponse() as { statusCode: number; message: string[]; error: string };
                message = error?.message[0] || "Bad Request";
            } else {
                message = exception.getResponse() as string;
            }
        }

        if (message instanceof ExceptionMessage) {
            status = message.status;
            message = message.message;
        } else if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            message = "Internal Server Error";
        }

        response.status(status).json({
            message: message,
            status: status,
        });
    }

    private isValidationErrorResponse(response: any): response is { statusCode: number; message: string[]; error: string } {
        return (
            typeof response === 'object' &&
            response !== null &&
            'statusCode' in response &&
            'message' in response &&
            Array.isArray(response.message) &&
            'error' in response
        );
    }

}