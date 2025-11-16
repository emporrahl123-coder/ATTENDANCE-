import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from '../sessions/sessions.entity';
import { SessionToken } from '../sessions/session-token.entity';
import { User } from '../users/users.entity';
import { AttendanceRecord } from './attendance.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity, SessionToken, AttendanceRecord, User]), UsersModule],
  controllers: [AttendanceController],
  providers: [AttendanceService]
})
export class AttendanceModule {}
