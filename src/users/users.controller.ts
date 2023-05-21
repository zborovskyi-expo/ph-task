import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('users')
@UseGuards(ApiKeyGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): IUser[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): IUser {
    const user = this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return user;
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() user: CreateUserDto): IUser {
    return this.usersService.create(user);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() user: UpdateUserDto): IUser {
    const updatedUser = this.usersService.update(id, user);

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return updatedUser;
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.usersService.remove(id);
  }
}
