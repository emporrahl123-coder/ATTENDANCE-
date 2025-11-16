import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('session_tokens')
export class SessionToken {
  @PrimaryColumn({ type: 'text' })
  token: string;

  @Column({ type: 'uuid' })
  session_id: string;

  @Column({ type: 'timestamptz' })
  expires_at: Date;

  @Column({ type: 'boolean', default: false })
  used: boolean;
}
