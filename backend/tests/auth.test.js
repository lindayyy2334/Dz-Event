const request = require('supertest');
const app = require('../server'); // Import the server instance

describe('Auth Routes', () => {
    test('should sign up a user', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({ username: 'testuser', password: 'testpass' });
        expect(res.statusCode).toBe(200);
    });
});
