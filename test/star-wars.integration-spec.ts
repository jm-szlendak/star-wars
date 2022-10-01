import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('StarWars controler (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close()
  })

  describe('Create, Retrieve and Delete character', () => {
    let id;

    it('should return 400 if invalid payload provided', () => {
      return request(app.getHttpServer())
        .post('/star-wars/characters/')
        .send({})
        .expect(400)
    });


    it('should create character properly', async () => {
      const response = await request(app.getHttpServer())
        .post('/star-wars/characters/')
        .send({
          name: 'test',
          episodes: [
            { name: 's1e1' },
            { name: 's1e2' }]
        })

      expect(response.status).toEqual(201)
      expect(response.body.data).toBeTruthy

      id = response.body.data

      const getResponse = await request(app.getHttpServer())
        .get(`/star-wars/characters/${id}`)

      expect(getResponse.status).toEqual(200)
      expect(getResponse.body).toEqual({
        data: {
          id,
          name: 'test',
          deleted: null,
          episodes: [
            { name: 's1e1' },
            { name: 's1e2' }
          ],
          planet: null
        }
      })
    });


    it('should delete character', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/star-wars/characters/${id}`)

      expect(response.status).toEqual(200)
      const getResponse = await request(app.getHttpServer())
        .get(`/star-wars/characters/${id}`)

      expect(getResponse.status).toEqual(200)
      expect(getResponse.body.data.deleted).toBeTruthy()
    });
  });

  describe('Update Character', () => {
    let id;

    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/star-wars/characters/')
        .send({
          name: 'test',
          episodes: [
            { name: 's1e1' },
            { name: 's1e2' }]
        })
      id = response.body.data
    })

    afterAll(async () => {
      await request(app.getHttpServer())
        .delete(`/star-wars/characters/${id}`)
    })

    it('should return 400 if invalid payload provided', () => {
      return request(app.getHttpServer())
        .patch(`/star-wars/characters/${id}`)
        .send({})
        .expect(400)
    });


    it('should return 200 when correct payload was provided', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/star-wars/characters/${id}`)
        .send({
          name: 'test2',
          episodes: [
            { name: 's1e1' }
          ],
          planet: { name: 'mars' }
        })
      expect(response.status).toEqual(200)

      const getResponse = await request(app.getHttpServer())
        .get(`/star-wars/characters/${id}`)

      expect(getResponse.status).toEqual(200)
      expect(getResponse.body).toEqual({
        data: {
          id,
          name: 'test2',
          deleted: null,
          episodes: [
            { name: 's1e1' },
          ],
          planet: { name: 'mars' }
        }
      })
    });
  });

  describe('Get Many Characters', () => {
    beforeAll(async () => {

      const characters = [
        {
          name: 'n1',
          episodes: [{ name: 's1e1' }, { name: 's1e2' }]
        },
        {
          name: 'n2',
          episodes: [{ name: 's1e2' }],
          planet: { name: 'earth' }
        },
        {
          name: 'n3',
          episodes: [{ name: 's1e1' }, { name: 's1e2' }]
        },
        {
          name: 'n4',
          episodes: [{ name: 's1e1' }],
          planet: { name: 'flurvix' }
        },
        {
          name: 'n5',
          episodes: [{ name: 's1e1' }, { name: 's1e2' }]
        },
      ]

      for (const character of characters) {
        await request(app.getHttpServer())
          .post('/star-wars/characters/')
          .send(character)
      }

    })


    it('should return 400 if invalid parameters provided', () => {
      return request(app.getHttpServer())
        .get(`/star-wars/characters`)
        .expect(400)
    });


    it('should return 200 with paginated response', async () => {
      const response = await request(app.getHttpServer())
        .get(`/star-wars/characters?page=5&pageSize=1`)

      expect(response.status).toEqual(200)
      expect(response.body.data.characters).toHaveLength(1)

    });
  });

});
