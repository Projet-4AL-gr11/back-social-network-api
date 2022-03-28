import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModuleTestE2e } from '../src/app.module.test-e2e';
import { Connection } from 'typeorm';
import { User } from '../src/api/user/domain/entities/user.entity';
import { UserType } from '../src/api/user/domain/enum/user-type.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let jwtTokenAuth: string;
  let jwtTokenRefresh: string;

  const mockUser1: User = new User();
  mockUser1.email = 'user@email.com';
  mockUser1.username = 'billy';
  mockUser1.password = 'hash';
  mockUser1.userType = UserType.USER;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModuleTestE2e],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const connection = app.get(Connection);
    await connection.synchronize(true);
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(mockUser1)
      .execute();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    describe('login', () => {
      it('authenticates a user and includes a jwt token in the response', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/login')
          .send({ username: 'billy', password: 'hash' })
          .expect(200);

        jwtTokenRefresh = response.get('Set-Cookie')[1].slice(0, 200);

        expect(jwtTokenRefresh).toMatch(
          /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
        );
      });

      it('fails to authenticate user that does not exist', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/login')
          .send({ username: 'bonjour', password: 'test' })
          .expect(400);

        expect(response.body.accessToken).not.toBeDefined();
      });
    });

    describe('register', () => {
      it('should register a new user', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/register')
          .send({
            username: 'billy2',
            email: 'billy2@gmail.com',
            password: 'hash',
          })
          .expect(201);

        expect(response).toBeDefined();
      });
      it('should not register for duplicate Username', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/register')
          .send({
            username: 'billy',
            email: 'billy3@gmail.com',
            password: 'hash',
          })
          .expect(400);
      });
      it('should not register for duplicate Email', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/register')
          .send({
            username: 'billy',
            email: 'user@email.com',
            password: 'hash',
          })
          .expect(400);
      });
      it('should not register for username too short', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/register')
          .send({ username: 'bill', email: 'bill@email.com', password: 'hash' })
          .expect(400);
      });
    });

    describe('Language', () => {
      beforeAll(async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/login')
          .send({ username: 'billy', password: 'hash' })
          .expect(200);

        jwtTokenAuth = response.get('Set-Cookie')[1].slice(8, 200);
      });

      it('should create a language then getIt then update it then deleteIt', async () => {
        const response = await request(app.getHttpServer())
          .post('/language/')
          .set('Authorization', `Bearer ${jwtTokenAuth}`)
          .send({ name: 'test' })
          .expect(200);

        const responseGet = await request(app.getHttpServer())
          .get('/language/' + response.body.id)
          .expect(200);

        const responseUpdate = await request(app.getHttpServer())
          .post('/language/' + response.body.id)
          .send({ name: 'test2' })
          .set('Refresh', `${jwtTokenRefresh}`)
          .expect(200);

        expect(responseUpdate.body.name).toEqual('test2');

        await request(app.getHttpServer())
          .delete('/language/' + response.body.id)
          .set('Refresh', `${jwtTokenRefresh}`)
          .expect(200);

        expect(
          await await request(app.getHttpServer())
            .get('/language/' + response.body.id)
            .expect(200),
        ).toEqual({});
      });
      it('should get all language', async () => {
        const response = await request(app.getHttpServer())
          .get('/language/')
          .expect(200);
      });
    });
  });
});
