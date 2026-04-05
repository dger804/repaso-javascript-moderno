import { Controller, Get, Body, Post, UseGuards, Param, Patch, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
 
  @Get()
  getUsers(@Query() query: GetUsersDto) {
    return this.usersService.getUsers(query);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body.name, body.email);
  }

  @ApiOperation({
    summary: 'Get admin data',
    description: '🔒 Requires ADMIN role',
  })
  @Roles(Role.ADMIN)
  @Get('admin')
  getAdminData(@CurrentUser() user) {
    return {
      message: 'Solo los ADMIN pueden ver esto',
      user,
    };
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id/role')
  updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto,
    @CurrentUser() user
  ) {
    return this.usersService.updateRole(id, dto.role, user.id);
  }

  @Get('me')
  getMe(@CurrentUser() user) {
    return user;
  }

  @Patch('me')
  updateMe(
    @CurrentUser() user,
    @Body() dto: UpdateProfileDto
  ) {
    return this.usersService.updateProfile(user.id, dto);
  }
}
