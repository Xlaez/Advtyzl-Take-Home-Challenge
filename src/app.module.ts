import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Environment } from './configs';
import { RoomsModule } from './rooms/rooms.module';
import { Room } from './rooms/rooms.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password123',
      database: 'litpad',
      entities: [Room],
      synchronize: new Environment().dev(),
      retryAttempts: 6,
    }),
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
