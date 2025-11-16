import { Controller, Post, Body, Param } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private svc: SessionsService) {}

  @Post()
  async create(@Body() body: any) {
    return this.svc.createSession(body);
  }

  @Post(':id/qr')
  async createQr(@Param('id') id: string) {
    return this.svc.generateQrForSession(id, 15);
  }
}
