import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { createPostgresPool } from '../infra/database/postgres/postgres.pool';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
