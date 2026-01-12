import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { createPostgresPool } from '../infra/database/postgres/postgres.pool';

const dbProvider = {
  provide: 'PG_POOL',
  useFactory: createPostgresPool,
};

@Module({
  controllers: [UsersController],
  providers: [dbProvider, UsersService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
