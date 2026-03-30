import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { User } from './entities/user.entity';
import { Role } from '../auth/roles.enum'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number) {
    limit = limit > 100 ? 100 : limit;
    const [data, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async createUser(email: string, password: string) {
    const user = this.repo.create({ email, password, role: Role.USER });
    return this.repo.save(user);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async findAll() {
    return this.repo.find();
  }  

  async findById(id: number) {
    return this.repo.findOne({
      where: { id },
    });
  }
  
  async updateRole(userId: number, role: Role, currentUserId: number) {

    if (userId === currentUserId) {
      throw new BadRequestException('You cannot change your own role');
    }
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    user.role = role;
    return this.repo.save(user);
  }
}
