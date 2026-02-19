import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { RolesGuard } from './auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const port = process.env.PORT || 3000;
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  /*app.useGlobalGuards(
    new RolesGuard(app.get(Reflector))
  )*/
 //app.useGlobalGuards(new AuthGuard('jwt'));

  await app.listen(port);
  
  console.log(`Server running on port ${port}`);
}
bootstrap();
