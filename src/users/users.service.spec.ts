import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { UsersService } from './users.service';
import { IUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user', () => {
      const userDto: CreateUserDto = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
      };

      const createdUser: IUser = service.create(userDto);

      expect(createdUser.id).toBeDefined();
      expect(createdUser.firstName).toBe(userDto.firstName);
      expect(createdUser.lastName).toBe(userDto.lastName);
      expect(createdUser.email).toBe(userDto.email);
      expect(createdUser.phone).toBe(userDto.phone);
    });
  });
});
