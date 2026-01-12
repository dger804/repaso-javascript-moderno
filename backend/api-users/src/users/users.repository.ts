import { Pool } from 'pg';

export class UsersRepository {
  constructor(private readonly db: Pool) {}

  async findAll() {
    const result = await this.db.query('SELECT id, name, email FROM users');
    return result.rows;
  }

  async create(name: string, email: string) {
    const result = await this.db.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email',
      [name, email],
    );
    return result.rows[0];
  }
}
