import { Module, ValidationPipe } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { APP_PIPE } from '@nestjs/core';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ApiKeyStrategy } from '../auth/api-key.strategy';

@Module({
  imports: [PassportModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    ApiKeyStrategy,
  ],
})
export class UsersModule {}
