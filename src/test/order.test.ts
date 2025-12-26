import request from "supertest"
import app from "../app"
import jwt from 'jsonwebtoken'
import config from '../utils/env'

describe('GET /api/order', () => {
    it('Should return 200 and list of order', async () => {
        const res = await request(app)
            .get('/api/orders')

        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(true)
    })
})

describe('GET /api/order/stats/overview', () => {
    it('Should return 200 and order statistic has been found', async () => {
        const res = await request(app)
            .get('/api/orders/stats/overview')

        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(true)
    })
})

describe('POST /api/order/checkout', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET)

    it('Should return 400 if no token provided', async () => {
        const res = await request(app)
            .post('/api/orders/checkout')
            .send({
                data: [
                    { productId: 10, quantity: 1 }
                ]
            })

        expect(res.statusCode).toEqual(401)
        expect(res.body.success).toBe(false)
    })

    it('Should return 200 and order that has been created', async () => {
        const res = await request(app)
            .post('/api/orders/checkout')
            .send({
                data: [
                    { productId: 10, quantity: 1 }
                ]
            })
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toEqual(201)
        expect(res.body.success).toBe(true)
    })
})

describe('GET /api/order/:id', () => {
    it('Should return 200 and order that has been found', async () => {
        const res = await request(app)
            .get('/api/orders/13')

        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(true)
    })
})


// describe('DELETE /api/order/:id', () => {
//     const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET)

//     it('Should return 401 if no token provided', async () => {
//         const res = await request(app)
//             .delete('/api/orders/10')

//         expect(res.statusCode).toEqual(401)
//         expect(res.body.success).toBe(false)
//     })

//     it('Should return 200 and order that has been deleted', async () => {
//         const res = await request(app)
//             .delete('/api/orders/10')
//             .set('Authorization', `Bearer ${token}`)

//         expect(res.statusCode).toEqual(200)
//         expect(res.body.success).toBe(true)
//     })
// })