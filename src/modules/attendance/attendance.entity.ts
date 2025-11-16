import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('attendance_records')
export class AttendanceRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  session_id: string;

  @Column({ type: 'uuid' })
  course_id: string;

  @Column({ type: 'uuid' })
  student_id: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ type: 'text' })
  method: string;

  @Column({ type: 'text', default: 'present' })
  status: string;

  @Column({ type: 'text', nullable: true })
  device_id_hash: string;

  @Column({ type: 'double precision', nullable: true })
  gps_lat: number;

  @Column({ type: 'double precision', nullable: true })
  gps_lng: number;

  @Column({ type: 'int', nullable: true })
  gps_accuracy_m: number;

  @CreateDateColumn()
  created_at: Date;
}
