import { NestFactory } from '@nestjs/core';
import { AppModule } from './presentation/app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { GlobalExceptionFilter } from './presentation/exception/exceptionFilter';

async function bootstrap() {
    dotenv.config();

    const app = await NestFactory.create(AppModule);

    app.enableCors();

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    app.useGlobalFilters(new GlobalExceptionFilter());

    await app.listen(process.env.PORT || 3000);
}

bootstrap();