import { Inject, Injectable } from '@nestjs/common';
import type { Database } from 'better-sqlite3';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DB')
    private readonly db: Database,
  ) {}

  create(createUserDto: CreateUserDto): User {
    const stmt = this.db.prepare(
      'INSERT INTO users (name, email) VALUES (?, ?)',
    );

    const result = stmt.run(createUserDto.name, createUserDto.email);

    return {
      id: Number(result.lastInsertRowid),
      ...createUserDto,
    };
  }

  findAll(): User[] {
    return this.db.prepare('SELECT * FROM users').all() as User[];
  }

  findOne(id: number): User | undefined {
    return this.db.prepare('SELECT * FROM users WHERE id = ?').get(id) as
      | User
      | undefined;
  }

  update(id: number, updateUserDto: UpdateUserDto): User | undefined {
    const stmt = this.db.prepare(
      `UPDATE users 
      SET name = COALESCE(?, name),
          email = COALESCE(?, email)
      WHERE id = ?`,
    );

    stmt.run(updateUserDto.name ?? null, updateUserDto.email ?? null, id);

    return this.findOne(id);
  }

  remove(id: number) {
    this.db.prepare('DELETE FROM users WHERE id = ?').run(id);
    return { deleted: true };
  }
}
