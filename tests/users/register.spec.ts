import request from 'supertest';
import app from '../../src/app';
import { User } from '../../src/entity/User';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../src/config/data-source';
import { truncateTables } from '../utils';

describe('POST /auth/register', () => {
    let connection: DataSource;
    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });

    beforeEach(async () => {
        // Database truncate
        await truncateTables(connection);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    describe('Given all fields', () => {
        it('should return the 201 status code', async () => {
            // Arrange
            const userData = {
                firstName: 'Robin',
                lastName: 'M',
                email: 'robin@gmail.com',
                password: 'secret',
            };
            // Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            // Assert
            expect(response.statusCode).toBe(201);
        });
        it('it should return valid json response', async () => {
            // Arrange
            const userData = {
                firstName: 'Robin',
                lastName: 'M',
                email: 'robin@gmail.com',
                password: 'secret',
            };
            // Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            // Assert
            expect(
                (response.headers as Record<string, string>)['content-type'],
            ).toEqual(expect.stringContaining('json'));
        });
        it('should persist the user in the database', async () => {
            // Arrange
            const userData = {
                firstName: 'Robin',
                lastName: 'M',
                email: 'robin@gmail.com',
                password: 'secret',
            };
            // Act
            await request(app).post('/auth/register').send(userData);

            // assert
            const userRepository = connection.getRepository(User);
            const user = await userRepository.find();
            expect(user).toHaveLength(1);
        });
    });
    describe('Fields are missing', () => {});
});
