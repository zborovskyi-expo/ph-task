import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const DATA_FILE = path.resolve(__dirname, '../../data/users.json');

@Injectable()
export class UsersService {
  private users: IUser[];

  constructor() {
    this.users = this.loadUsers();
  }

  findAll(): IUser[] {
    return this.users;
  }

  findOne(id: string): IUser {
    return this.users.find((user) => user.id === id);
  }

  create(user: CreateUserDto): IUser {
    const newUser = { ...user, id: uuidv4() };

    this.users.push(newUser);

    this.saveUsers();

    return newUser;
  }

  update(id: string, user: UpdateUserDto): IUser {
    const existingUser = this.findOne(id);

    if (!existingUser) {
      return null;
    }

    const updatedUser = { ...existingUser, ...user };

    this.users = this.users.map((user) => {
      if (user.id !== id) {
        return user;
      }

      return updatedUser;
    });

    this.saveUsers();

    return updatedUser;
  }

  remove(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);

    if (index !== -1) {
      this.users.splice(index, 1);
      this.saveUsers();
    }
  }

  private loadUsers(): IUser[] {
    try {
      const fileContents = fs.readFileSync(DATA_FILE, 'utf-8');

      return JSON.parse(fileContents);
    } catch (error) {
      console.error('Error reading users file:', error);
      return [];
    }
  }

  private saveUsers(): void {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.users, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving users file:', error);
    }
  }
}
