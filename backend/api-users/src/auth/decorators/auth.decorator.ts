import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { Roles } from './roles.decorator';
import { Role } from '../roles.enum';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    ApiBearerAuth(),
    Roles(...roles),
    ApiOperation({
      description: `🔒 Requires role: ${roles.join(', ')}`,
    }),
  );
}