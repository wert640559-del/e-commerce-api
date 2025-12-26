**Database nya:**

 id |        name         | category |   price    | is_active |         create_at          
----+---------------------+----------+------------+-----------+----------------------------
  1 | Asus vivobook go 14 | laptop   | 6000000.00 | t         | 2025-12-08 14:11:20.845036
  2 | Fantech FLASH HQ54  | Headset  |  100000.00 | t         | 2025-12-08 14:17:38.421772
  3 | MOFii               | Mouse    |   85000.00 | t         | 2025-12-08 14:17:38.421772
  4 | WD Elements 320gb   | Hardisk  |  100000.00 | t         | 2025-12-08 14:17:38.421772
  5 | Tp-Link Tl-Wn725N   | Adapter  |   80000.00 | t         | 2025-12-08 14:21:09.287574

  toko_laptop_db=# select * from items where category = 'laptop';
 id |        name         | category |   price    | is_active |         create_at          
----+---------------------+----------+------------+-----------+----------------------------
  1 | Asus vivobook go 14 | laptop   | 6000000.00 | t         | 2025-12-08 14:11:20.845036

  toko_laptop_db=# select * from items where price > 5000000;
 id |        name         | category |   price    | is_active |         create_at          
----+---------------------+----------+------------+-----------+----------------------------
  1 | Asus vivobook go 14 | laptop   | 6000000.00 | t         | 2025-12-08 14:11:20.845036


	
**Jawaban nya:**

1. b. Structured Query Language  
2. c. PostgreSQL  
3. c. SELECT  
4. c. DECIMAL  
5. b. Sebagai pengenal unik setiap baris data  
6. a. SELECT * FROM products WHERE stock = 0;  
7. b. Urutkan harga dari termahal ke termurah  
8. c. Semua data di tabel products akan terhapus  
9. c. UPDATE  
10. b. Teks maksimal 50 karakter