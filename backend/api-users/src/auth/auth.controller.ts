import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth-response.dto';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('login')
  @Public()
  @ApiResponse({ status: 200, type: AuthResponseDto })
  login(@Body() dto: RegisterDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('register')
  @Public()
  @ApiResponse({ status: 201, type: AuthResponseDto })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password);
  }

  @ApiBearerAuth('access-token')
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user) {
    return user;
  }
}
