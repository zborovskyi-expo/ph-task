// test/users.e2e-spec.ts

import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersController (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users (GET)', () => {
    it('should return an array of users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeInstanceOf(Array);
        });
    });
  });

  describe('/users (POST)', () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '1234567890',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.firstName).toBe('John');
          expect(res.body.lastName).toBe('Doe');
          expect(res.body.email).toBe('john.doe@example.com');
          expect(res.body.phone).toBe('1234567890');
        });
    });
  });

  describe('/users/:id (GET)', () => {
    it('should return the specified user', () => {
      return request(app.getHttpServer())
        .get('/users/1')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.firstName).toBe('John');
          expect(res.body.lastName).toBe('Doe');
          expect(res.body.email).toBe('john.doe@example.com');
          expect(res.body.phone).toBe('1234567890');
        });
    });

    it('should return 404 if user not found', () => {
      return request(app.getHttpServer()).get('/users/999').expect(404);
    });
  });

  describe('/users/:id (PUT)', () => {
    it('should update the specified user', () => {
      return request(app.getHttpServer())
        .put('/users/1')
        .send({
          firstName: 'Updated',
          lastName: 'User',
          email: 'updated.user@example.com',
          phone: '9876543210',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.firstName).toBe('Updated');
          expect(res.body.lastName).toBe('User');
          expect(res.body.email).toBe('updated.user@example.com');
          expect(res.body.phone).toBe('9876543210');
        });
    });

    it('should return 404 if user not found', () => {
      return request(app.getHttpServer()).put('/users/999').expect(404);
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should delete the specified user', () => {
      return request(app.getHttpServer()).delete('/users/1').expect(200);
    });

    it('should return 404 if user not found', () => {
      return request(app.getHttpServer()).delete('/users/999').expect(404);
    });
  });
});
