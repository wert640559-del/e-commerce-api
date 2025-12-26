import app from "../app";
import request from "supertest";
import config from "../utils/env";
import jwt from 'jsonwebtoken';
describe('GET /api/category', () => {
    it('Should return 200 and list of category', async () => {
        const res = await request(app).get('/api/categories');
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data.categories)).toBe(true);
    });
});
describe('GET /api/category/:id', () => {
    it('Should return 200 and category that has been found', async () => {
        const res = await request(app)
            .get('/api/categories/10');
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
describe('POST /api/category', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET);
    it('Should return 401 if no token provided', async () => {
        const res = await request(app)
            .post('/api/categories')
            .send({ name: `New Category ${Date.now()}` });
        expect(res.statusCode).toEqual(401);
        expect(res.body.success).toBe(false);
    });
    it('Should return 200 and category that has been created', async () => {
        const res = await request(app)
            .post('/api/categories')
            .send({ name: `New Category ${Date.now()}` })
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
    });
});
describe('PUT /api/category/:id', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET);
    it('Should return 401 if no token provided', async () => {
        const res = await request(app)
            .put('/api/categories/10')
            .send({ name: `New Category ${Date.now()}` });
        expect(res.statusCode).toEqual(401);
        expect(res.body.success).toBe(false);
    });
    it('Should return 200 and category that has been updated', async () => {
        const res = await request(app)
            .put('/api/categories/10')
            .send({ name: `New Category ${Date.now()}` })
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
// describe('DELETE /api/category/:id', () => {
//     const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET)
//     it('Should return 401 if no token provided', async () => {
//         const res = await request(app)
//             .delete('/api/categories/26')
//         expect(res.statusCode).toEqual(401)
//         expect(res.body.success).toBe(false)
//     })
//     it('Should return 200 and category that has been deleted', async () => {
//         const res = await request(app)
//             .delete('/api/categories/25')
//             .set('Authorization', `Bearer ${token}`)
//         expect(res.statusCode).toEqual(200)
//         expect(res.body.success).toBe(true)
//     })
// })
//# sourceMappingURL=category.test.js.map