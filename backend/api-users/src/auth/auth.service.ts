import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private generateToken(user: any) {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  }

  async register(email: string, password: string) {
    const exists = await this.usersService.findByEmail(email);

    if (exists) {
      throw new ConflictException('Email already registered');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser(email, hash);

    return {
      access_token: this.generateToken(user),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return {
      access_token: this.generateToken(user),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
