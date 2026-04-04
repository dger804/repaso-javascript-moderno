import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty({
    example: {
      id: 1,
      email: 'test@mail.com',
      role: 'USER',
    },
  })
  user: {
    id: number;
    email: string;
    role: string;
  };
}