import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Environment } from './configs';
import { RoomsModule } from './rooms/rooms.module';
import { Rooms } from './rooms/rooms.entity';

const env = new Environment();

const postgresqlConfig: any = {
  type: 'postgres',
  host: env.prod() ? env.dbHostName : 'localhost',
  port: 5432,
  username: env.prod() ? env.dbUserName : 'user',
  password: env.prod() ? env.dbPassword : 'password123',
  database: env.prod() ? env.dbName : 'litpad',
  entities: [Rooms],
  synchronize: new Environment().dev(),
  retryAttempts: 6,
};

if (env.prod()) {
  postgresqlConfig.ssl = {
    rejectUnauthorized: false,
  };
}
@Module({
  imports: [TypeOrmModule.forRoot(postgresqlConfig), RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
