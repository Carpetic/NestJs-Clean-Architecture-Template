import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserORMEntity } from '../ORM/entities/UserORMEntity';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { UserSessionORMEntity } from '../ORM/entities/UserSessionORMEntity';

dotenv.config();

const config: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [UserORMEntity, UserSessionORMEntity],
    synchronize: false,
    migrations: [path.join(__dirname, '..', 'ORM', 'migration', '*.ts')],
}
export const TypeORMConfig = config;
export const SupabaseDataSource = new DataSource(config as DataSourceOptions);