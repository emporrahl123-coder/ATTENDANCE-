import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export type UserRole = 'student' | 'lecturer' | 'admin';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  role: UserRole;

  @Index({ unique: true })
  @Column({ type: 'text', nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Index({ unique: true })
  @Column({ type: 'text', nullable: true })
  student_number: string;

  @Column({ type: 'text' })
  password_hash: string;

  @Column({ type: 'text', nullable: true })
  id_photo_url: string;

  @Column({ type: 'text', nullable: true })
  device_id_hash: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
