import request from 'supertest'
import jwt from 'jsonwebtoken'
import config from '../utils/env'
import app from '../app'
import path from 'path'

describe('GET /api/product', () => {

    it('should return 200 and list of product', async () => {
        const res = await request(app).get('/api/products')

        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(true)
        expect(Array.isArray(res.body.data.products)).toBe(true)
    })
})

describe('GET /api/product/:id', () => {
    it('should return 200 and product that has been found', async () => {
        const res = await request(app)
            .get('/api/products/10')

        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(true)
    })
})

describe('GET /api/product/stats', () => {
    it('Should return 200 and product statistic has been found', async () => {
        const res = await request(app)
            .get('/api/products/stats')
        
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(true)
    })
})

describe('POST /api/product', () => {
    const token = jwt.sign({id: 1, role: 'ADMIN'}, config.JWT_SECRET)

    it('should return 401 if no token provided', async () => {
        const res = await request(app)
            .post('/api/products')
            .field('name', 'Product 1')
            .field('description', 'apa aja')
            .field('price', 100)
            .field('stock', 10)
            .field('categoryId', 8)
            .attach('image', path.resolve(__dirname, '../../download.jpeg'))

            expect(res.statusCode).toEqual(401)
            expect(res.body.success).toBe(false)
    })

    it('Should return 200 and product that has been created', async () => {
        const res = await request(app)
            .post('/api/products')
            .field('name', 'Product 1')
            .field('description', 'apa aja')
            .field('price', 100)
            .field('stock', 10)
            .field('categoryId', 8)
            .attach('image', path.resolve(__dirname, '../../download.jpeg'))
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toEqual(201)
        expect(res.body.success).toBe(true)
        expect(res.body.data.name).toBe('Product 1')
    })
    
})

describe('PUT /api/product/:id', () => {
    // Pastikan token sudah didefinisikan di atas describe ini
    const token = jwt.sign({id: 1, role: 'ADMIN'}, config.JWT_SECRET)

    it('Should return 200 and product that has been updated', async () =>  {
        const res = await request(app)
            .put('/api/products/11')
            .set('Authorization', `Bearer ${token}`) 
            .field('name', 'Product 2')
            .field('description', 'apa aja')
            .field('price', 200)
            .field('stock', 20)
            .field('categoryId', 9)
            .attach('image', path.resolve(__dirname, '../../download.jpeg'))
            
        // Ubah dari 201 menjadi 200
        expect(res.statusCode).toEqual(200) 
        expect(res.body.success).toBe(true)
        expect(res.body.data.name).toBe('Product 2')
    })
})

// describe('DELETE /api/product/:id', () => {
//     const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET)

//     it('Should return 200 and product that has been deleted', async () => {
//         const res = await request(app)
//             .delete('/api/products/331')
//             .set('Authorization', `Bearer ${token}`)

//         expect(res.statusCode).toEqual(200)
//         expect(res.body.success).toBe(true)
//         expect(res.body.data.name).toBe('Product 2')
//     })
// })