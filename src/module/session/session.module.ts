import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './sessions.entity';
import { SessionToken } from './session-token.entity';
import { ConfigModule } from '@nestjs/config';
import Redis from 'ioredis';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([SessionEntity, SessionToken]), UsersModule],
  providers: [
    SessionsService,
    { provide: 'REDIS_CLIENT', useFactory: () => new Redis({ host: process.env.REDIS_HOST, port: +(process.env.REDIS_PORT||6379) }) }
  ],
  controllers: [SessionsController],
  exports: [SessionsService]
})
export class SessionsModule {}
