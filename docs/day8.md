**Barang beserta kategorinya**

toko_laptop_db=# SELECT
    i.id,
    i.name AS item_name,
    c.name AS category_name,
    i.price
FROM
    items i
JOIN
    categories c ON i.category_id = c.id
ORDER BY
    c.name, i.name;
 id |      item_name      | category_name |   price    
----+---------------------+---------------+------------
  4 | WD Elements 320gb   | Adapter       |  100000.00
  2 | Fantech FLASH HQ54  | Headset       |  100000.00
  5 | Tp-Link Tl-Wn725N   | Keyboard      |   80000.00
  1 | Asus vivobook go 14 | Laptop        | 6000000.00
  3 | MOFii               | Mouse         |   85000.00
(5 rows)

**Hitung total per-category**

toko_laptop_db=# SELECT
    c.name AS category_name,
    COUNT(i.id) AS total_items
FROM
    categories c
LEFT JOIN
    items i ON c.id = i.category_id
GROUP BY
    c.name
ORDER BY
    total_items DESC;
 category_name | total_items 
---------------+-------------
 Adapter       |           1
 Mouse         |           1
 Laptop        |           1
 Headset       |           1
 Keyboard      |           1
(5 rows)

**Kategory yang punya barang termahal**

toko_laptop_db=# SELECT
    c.name AS category_name,
    MAX(i.price) AS max_price
FROM
    items i
JOIN
    categories c ON i.category_id = c.id
GROUP BY
    c.name
ORDER BY
    max_price DESC
LIMIT 1;
 category_name | max_price  
---------------+------------
 Laptop        | 6000000.00
(1 row)

**Jawabang pilihan ganda**

1.  b. One-to-Many
2.  b. Menghubungkan satu tabel ke tabel lain
3.  c. JOIN
4.  c. INNER JOIN
5.  b. Data tabel kanan berisi `NULL`
6.  c. COUNT()
7.  c. Fungsi Agregasi (COUNT, SUM, dll)
8.  b. HAVING
9.  c. Untuk Pagination (Halaman)
10. c. 3 Tabel (1 tabel pivot/penghubung)
