import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class UsersService {
  constructor(
    @Inject('PG_POOL') private readonly pool: Pool
  ) {}

  async getUsers() {
    const result = await this.pool.query('SELECT * FROM users');
    return result.rows;
  }

  async createUser(name: string, email: string) {
    const result = await this.pool.query(
      'INSERT INTO users(name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return result.rows[0];
  }

  async findByEmail(email: string) {
    const result = await this.pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );

    return result.rows[0];
  }

}
