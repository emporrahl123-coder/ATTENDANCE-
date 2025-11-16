import { Controller, Post, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private svc: AttendanceService) {}

  @Post('mark')
  async mark(@Body() body: any) {
    return this.svc.markAttendance(body);
  }
}
