import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async createStudent(payload: Partial<User>) {
    const passwordHash = await bcrypt.hash(payload.password_hash || 'changeme', 10);
    const u = this.usersRepo.create({ ...payload, password_hash: passwordHash });
    return this.usersRepo.save(u);
  }

  async findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findById(id: string) {
    return this.usersRepo.findOne({ where: { id } });
  }

  async verifyPassword(user: User, password: string) {
    return bcrypt.compare(password, user.password_hash);
  }
}
