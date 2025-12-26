**get localhost:3000/api/products/**

{
    "success": true,
    "message": "Produk berhasil diambil",
    "data": {
        "jumlah": 6,
        "data": [
            {
                "id": 1,
                "name": "iPhone 15 Pro",
                "description": "iPhone flagship terbaru",
                "price": "25000000",
                "stock": 50,
                "categoryId": 1,
                "createdAt": "2025-12-11T04:05:37.178Z",
                "updatedAt": "2025-12-11T04:09:52.136Z",
                "category": {
                    "id": 1,
                    "name": "Smartphone",
                    "createdAt": "2025-12-11T04:05:31.772Z",
                    "updatedAt": "2025-12-11T04:05:31.772Z"
                }
            },
            {
                "id": 2,
                "name": "Samsung S26 Ultra",
                "description": "Samsung terbaik di 2025",
                "price": "25000000",
                "stock": 90,
                "categoryId": 1,
                "createdAt": "2025-12-11T04:08:09.955Z",
                "updatedAt": "2025-12-11T04:10:44.982Z",
                "category": {
                    "id": 1,
                    "name": "Smartphone",
                    "createdAt": "2025-12-11T04:05:31.772Z",
                    "updatedAt": "2025-12-11T04:05:31.772Z"
                }
            },
            {
                "id": 3,
                "name": "Asus Vivobook go14",
                "description": "Laptop terbaik",
                "price": "7000000",
                "stock": 20,
                "categoryId": 2,
                "createdAt": "2025-12-11T04:09:13.263Z",
                "updatedAt": "2025-12-11T04:10:53.428Z",
                "category": {
                    "id": 2,
                    "name": "Laptop",
                    "createdAt": "2025-12-11T04:09:04.649Z",
                    "updatedAt": "2025-12-11T04:09:04.649Z"
                }
            },
            {
                "id": 12,
                "name": "Axioo Hype 5",
                "description": "Laptop terbaik",
                "price": "7000000",
                "stock": 25,
                "categoryId": 2,
                "createdAt": "2025-12-11T04:12:21.483Z",
                "updatedAt": "2025-12-11T04:12:21.483Z",
                "category": {
                    "id": 2,
                    "name": "Laptop",
                    "createdAt": "2025-12-11T04:09:04.649Z",
                    "updatedAt": "2025-12-11T04:09:04.649Z"
                }
            },
            {
                "id": 13,
                "name": "Aqua",
                "description": "dari air pegunungan",
                "price": "3000",
                "stock": 10,
                "categoryId": 3,
                "createdAt": "2025-12-11T04:15:09.967Z",
                "updatedAt": "2025-12-11T04:15:09.967Z",
                "category": {
                    "id": 3,
                    "name": "Minuman",
                    "createdAt": "2025-12-11T04:13:48.553Z",
                    "updatedAt": "2025-12-11T04:13:48.553Z"
                }
            },
            {
                "id": 14,
                "name": "Teh Botol",
                "description": "Teh dalam botol",
                "price": "5000",
                "stock": 10,
                "categoryId": 3,
                "createdAt": "2025-12-11T04:16:01.517Z",
                "updatedAt": "2025-12-11T04:16:01.517Z",
                "category": {
                    "id": 3,
                    "name": "Minuman",
                    "createdAt": "2025-12-11T04:13:48.553Z",
                    "updatedAt": "2025-12-11T04:13:48.553Z"
                }
            }
        ]
    }
}

**get localhost:3000/api/categories/**

{
    "success": true,
    "message": "Kategori berhasil diambil",
    "data": [
        {
            "id": 1,
            "name": "Smartphone",
            "createdAt": "2025-12-11T04:05:31.772Z",
            "updatedAt": "2025-12-11T04:05:31.772Z",
            "products": [
                {
                    "id": 1,
                    "name": "iPhone 15 Pro",
                    "description": "iPhone flagship terbaru",
                    "price": "25000000",
                    "stock": 50,
                    "categoryId": 1,
                    "createdAt": "2025-12-11T04:05:37.178Z",
                    "updatedAt": "2025-12-11T04:09:52.136Z"
                },
                {
                    "id": 2,
                    "name": "Samsung S26 Ultra",
                    "description": "Samsung terbaik di 2025",
                    "price": "25000000",
                    "stock": 90,
                    "categoryId": 1,
                    "createdAt": "2025-12-11T04:08:09.955Z",
                    "updatedAt": "2025-12-11T04:10:44.982Z"
                }
            ]
        },
        {
            "id": 2,
            "name": "Laptop",
            "createdAt": "2025-12-11T04:09:04.649Z",
            "updatedAt": "2025-12-11T04:09:04.649Z",
            "products": [
                {
                    "id": 3,
                    "name": "Asus Vivobook go14",
                    "description": "Laptop terbaik",
                    "price": "7000000",
                    "stock": 20,
                    "categoryId": 2,
                    "createdAt": "2025-12-11T04:09:13.263Z",
                    "updatedAt": "2025-12-11T04:10:53.428Z"
                },
                {
                    "id": 12,
                    "name": "Axioo Hype 5",
                    "description": "Laptop terbaik",
                    "price": "7000000",
                    "stock": 25,
                    "categoryId": 2,
                    "createdAt": "2025-12-11T04:12:21.483Z",
                    "updatedAt": "2025-12-11T04:12:21.483Z"
                }
            ]
        },
        {
            "id": 3,
            "name": "Minuman",
            "createdAt": "2025-12-11T04:13:48.553Z",
            "updatedAt": "2025-12-11T04:13:48.553Z",
            "products": [
                {
                    "id": 13,
                    "name": "Aqua",
                    "description": "dari air pegunungan",
                    "price": "3000",
                    "stock": 10,
                    "categoryId": 3,
                    "createdAt": "2025-12-11T04:15:09.967Z",
                    "updatedAt": "2025-12-11T04:15:09.967Z"
                },
                {
                    "id": 14,
                    "name": "Teh Botol",
                    "description": "Teh dalam botol",
                    "price": "5000",
                    "stock": 10,
                    "categoryId": 3,
                    "createdAt": "2025-12-11T04:16:01.517Z",
                    "updatedAt": "2025-12-11T04:16:01.517Z"
                }
            ]
        }
    ]
}