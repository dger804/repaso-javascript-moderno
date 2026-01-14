import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
  
  @Get()
  getAll() {
    return this.usersService.getUsers();
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body.name, body.email);
  }
}
