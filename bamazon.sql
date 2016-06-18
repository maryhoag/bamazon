-- USE bamazon_db;
-- CREATE TABLE products (
-- item_id INTEGER(10) NOT NULL,
-- name VARCHAR(30) NOT NULL,
-- department VARCHAR(30) NOT NULL,
-- price DECIMAL(10),
-- stock INTEGER(10)
-- );

I-- NSERT INTO products (item_id, name, department, price, stock)
-- VALUES
	-- (1, "coffee", "food", 4.99, 101),
    -- (2, "bicycle", "sporting goods", 137.49, 5),
    -- (3, "tea", "food", 3.99, 55),
    -- (4, "yoga mat", "sporting goods", 25.00, 12),
    -- (5, "student planner", "office goods", 17.99, 43),
    -- (6, "traveler's notebook", "office goods", 34.99, 19),
    -- (7, "basketball", "sporting goods", 20.00, 13),
    -- (8, "lucky charms", "food", 3.99, 34),
    -- (9, "sharpies", "office goods", 5.00, 12),
    -- (10, "laptop", "office goods", 598.99, 8);
    
    
SELECT price from products;
ALTER TABLE products MODIFY price DECIMAL(8, 2);
UPDATE products SET price = 598.99
WHERE price = 599.00;


    
    
    