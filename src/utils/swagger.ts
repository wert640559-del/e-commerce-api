// import config from './env'
import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-Commerce API E-Commerce',
            version: '1.0.0',
            description: 'Dokumentasi lengkap API E-Commerce',
            contact: {
                name: 'Backend Developer',
            }
        },
        servers: [
            {
                url: `https://e-commerce-api-production-ce14.up.railway.app/api`,
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth:{
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            }
        ]
    },
    apis: ['src/routes/*.ts'],
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec