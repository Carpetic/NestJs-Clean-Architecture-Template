import { BadRequestException, ConflictException, ForbiddenException, HttpStatus, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { IException } from "src/application/interface/services/exception.interface";
import { ExceptionMessage } from "src/domain/entities/Exception";

export class Exception implements IException {
    BadRequestException(message?: string): void {
        const error = new ExceptionMessage(
            message || "Bad Request",
            HttpStatus.BAD_REQUEST
        );
        throw new BadRequestException(error);
    }
    InternalServerErrorException(message?: string): void {
        const error = new ExceptionMessage(
            message || "Internal Server Error",
            HttpStatus.INTERNAL_SERVER_ERROR
        );
        throw new InternalServerErrorException(error);
    }
    ForbiddenException(message?: string): void {
        const error = new ExceptionMessage(
            message || "Forbidden",
            HttpStatus.FORBIDDEN
        );
        throw new ForbiddenException(error);
    }
    UnauthorizedException(message?: string): void {
        const error = new ExceptionMessage(
            message || "Unauthorized",
            HttpStatus.UNAUTHORIZED
        );
        throw new UnauthorizedException(error);
    }
    NotFoundException(message?: string): void {
        const error = new ExceptionMessage(
            message || "Not Found",
            HttpStatus.NOT_FOUND
        );
        throw new NotFoundException(error);
    }
    ConflictException(message?: string): void {
        const error = new ExceptionMessage(
            message || "Conflict",
            HttpStatus.CONFLICT
        );
        throw new ConflictException(error);
    }
}
