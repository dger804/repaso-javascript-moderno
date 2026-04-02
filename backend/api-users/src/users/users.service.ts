import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { User } from './entities/user.entity';
import { Role } from '../auth/roles.enum'
import { GetUsersDto } from './dto/get-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async getUsers(query: GetUsersDto) {
    const { page, limit, role, email, sortBy, order, search } = query;

    const qb = this.repo.createQueryBuilder('user');

    if (search) {
      qb.andWhere(
        '(user.email ILIKE :search OR user.name ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (role) {
      qb.andWhere('user.role = :role', { role });
    }

    if (email) {
      qb.andWhere('user.email ILIKE :email', {
        email: `%${email}%`,
      });
    }

    if (sortBy) {
      qb.orderBy(`user.${sortBy}`, order);
    } else {
      qb.orderBy('user.id', 'ASC'); // default
    }

    qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();

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
