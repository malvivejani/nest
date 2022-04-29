import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [__dirname + '/../**/*.entity{ .ts,.js}'],
    synchronize: true,
    logging: 'all'
};
