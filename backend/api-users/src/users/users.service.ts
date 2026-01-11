import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];
  findAll() {
    return this.users;
  }
  create(name: string) {
    const user = { id: Date.now(), name };
    this.users.push(user);
    return user;
  }
}
