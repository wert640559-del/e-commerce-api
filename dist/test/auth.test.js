import request from 'supertest';
import app from '../app';
describe('POST /api/auth/login', () => {
    it('Should return 200 and a token if credentials are correct', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
            email: 'user@example.com',
            password: 'rahasia123'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('token');
    });
    it('Should return 401/400 if password wrong', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'admin@example.com', password: 'wrongpassword' });
        expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
});
describe('POST /api/auth/register', () => {
    it('Should return 201 if registration is successful', async () => {
        const uniqueEmail = `user_${Date.now()}@example.com`;
        const username = `user_${Date.now()}`;
        const res = await request(app)
            .post('/api/auth/register')
            .send({
            username: username,
            email: uniqueEmail,
            password: 'password123'
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
    });
});
//# sourceMappingURL=auth.test.js.map