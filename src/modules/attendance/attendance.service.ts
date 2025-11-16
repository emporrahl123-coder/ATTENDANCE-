import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AttendanceRecord } from './attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { verifyToken } from '../sessions/qr.util';
import * as haversine from 'haversine-distance'; // we'll implement simple haversine fallback if not installed

@Injectable()
export class AttendanceService {
  constructor(@InjectRepository(AttendanceRecord) private attRepo: Repository<AttendanceRecord>) {}

  // core verification: token (QR), gps check, device check
  async markAttendance(payload: {
    token: string;
    session_id?: string;
    student_id: string;
    course_id: string;
    device_id_hash: string;
    gps: { lat: number; lng: number; acc?: number };
  }) {
    const verified = verifyToken(payload.token);
    if (!verified.ok) throw new BadRequestException({ reason: 'invalid_token', detail: verified });

    // ensure token session match if provided
    if (payload.session_id && verified.payload.session_id !== payload.session_id) {
      throw new BadRequestException('token-session-mismatch');
    }

    // (1) Simple GPS validation placeholder: compare student's gps to session location
    // In production, fetch session location from DB. Here we trust client passes course_id/session_id for demo.
    // We'll assume session location is included (real code should query session)
    // For demo, accept any gps if present
    const gpsOk = !!payload.gps && typeof payload.gps.lat === 'number';
    if (!gpsOk) throw new BadRequestException('missing_gps');

    // (2) Device binding check - in real code, compare with user's device_profile
    // For demo just accept but store device hash

    const rec = this.attRepo.create({
      session_id: verified.payload.session_id,
      course_id: payload.course_id,
      student_id: payload.student_id,
      method: 'qr',
      status: 'present',
      device_id_hash: payload.device_id_hash,
      gps_lat: payload.gps.lat,
      gps_lng: payload.gps.lng,
      gps_accuracy_m: payload.gps.acc || null
    });
    return this.attRepo.save(rec);
  }
}
