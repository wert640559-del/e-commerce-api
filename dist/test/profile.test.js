import jwt from 'jsonwebtoken';
import config from '../utils/env';
import request from 'supertest';
import app from '../app';
import path from 'path';
describe('GET /api/profile/me', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET);
    it('Should return 401 if no token provided', async () => {
        const res = await request(app)
            .get('/api/profile/me');
        expect(res.statusCode).toEqual(401);
        expect(res.body.success).toBe(false);
        expect(Array.isArray(res.body.data)).toBe(false);
    });
    it('Should return 200 and give profile', async () => {
        const res = await request(app)
            .get('/api/profile')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
describe('POST /api/profile/me', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET);
    it('Should return 401 if no token provided', async () => {
        const res = await request(app)
            .post('/api/profile/me')
            .field('name', 'afsjlkd')
            .field('gender', 'Laki-laki')
            .field('address', 'Jl. Raya No. 1')
            .attach('image', path.resolve(__dirname, '../../download.jpeg'));
        if (res.statusCode !== 401)
            console.log(res.body);
        expect(res.statusCode).toEqual(401);
        expect(res.body.success).toBe(false);
        // expect(Array.isArray(res.body.data)).toBe(false)
    });
    it('Should return 200 and list profile', async () => {
        const res = await request(app)
            .post('/api/profile/me')
            .field('name', 'Halo')
            .field('gender', 'Laki-laki')
            .field('address', 'Jl. Raya No. 1')
            .attach('image', path.resolve(__dirname, '../../download.jpeg'))
            .set('Authorization', `Bearer ${token}`);
        if (res.statusCode !== 200 || 201)
            console.log(res.body);
        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe('Halo');
    });
});
describe('GET /api/profile', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET);
    it('Should return 401 if no token provided', async () => {
        const res = await request(app)
            .get('/api/profile');
        expect(res.statusCode).toEqual(401);
        expect(res.body.success).toBe(false);
        expect(Array.isArray(res.body.data)).toBe(false);
    });
    it('Should return 200 and list profile', async () => {
        const res = await request(app)
            .get('/api/profile')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
describe('GET /api/profile/stats', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET);
    it('Should return 401 if no token provided', async () => {
        const res = await request(app)
            .get('/api/profile/stats');
        expect(res.statusCode).toEqual(401);
        expect(res.body.success).toBe(false);
        expect(Array.isArray(res.body.data)).toBe(false);
    });
    it('Should return 200 and profile statistic is found', async () => {
        const res = await request(app)
            .get('/api/profile/stats')
            .set('Authorization', `Bearer ${token}`);
        if (res.statusCode !== 200)
            console.log(res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
describe('DELETE /api/profile/:id', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET);
    // it('Should return 401 if no token provided', async () => {
    //     const res = await request(app)
    //         .delete('/api/profile/1')
    //     expect(res.statusCode).toEqual(401)
    //     expect(res.body.success).toBe(false)
    // })
    it('Should return 200 and that profile has been deleted', async () => {
        const res = await request(app)
            .delete('/api/profile/1')
            .set('Authorization', `Bearer ${token}`);
        if (res.statusCode !== 200)
            console.log(res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
//# sourceMappingURL=profile.test.js.map