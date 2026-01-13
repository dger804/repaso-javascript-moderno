import { Controller, Get, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getUsers();
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body.name, body.email);
  }
}
