-- Schema for Mirchi Powder Store (PostgreSQL) — Updated with 6 products + auth

DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS shipping_rates CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- 1. Products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    spice_level INT NOT NULL,
    weight VARCHAR(50) NOT NULL,
    image TEXT NOT NULL,
    best_with TEXT DEFAULT 'Rice, Curries',
    shelf_life VARCHAR(50) DEFAULT '6 Months',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Shipping Rates
CREATE TABLE shipping_rates (
    id SERIAL PRIMARY KEY,
    country VARCHAR(100) UNIQUE NOT NULL,
    shipping_cost DECIMAL(10, 2) NOT NULL,
    delivery_days INT NOT NULL
);

-- 3. Orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'India',
    state VARCHAR(100),
    city VARCHAR(100),
    address TEXT NOT NULL,
    postal_code VARCHAR(50) NOT NULL,
    product VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    shipping DECIMAL(10, 2) NOT NULL,
    gst DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'Pending',
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Reviews
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'India',
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Contact Messages
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Admins (for JWT auth)
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- SEED DATA
-- =====================

INSERT INTO products (name, price, description, ingredients, spice_level, weight, image, best_with, shelf_life) VALUES
(
  'Masala Karam',
  300.00,
  'A versatile traditional blend of sun-dried Guntur chillies, toasted coriander, cumin, fenugreek, and mustard seeds. Our grandmother''s daily-use South Indian recipe — perfect for curries, dals, and rice.',
  'Guntur Chillies, Coriander Seeds, Cumin Seeds, Garlic, Salt, Turmeric, Fenugreek, Mustard Seeds',
  3,
  '250g',
  '/images/masala_karam.png',
  'Rice, Sambar, Dal Fry',
  '6 Months'
),
(
  'Goddu Karam',
  600.00,
  'Pure unadulterated fiery red chilli powder from premium Guntur Sannam chillies. Sun-dried, stone-ground. No other ingredients — just 100% intense heat and deep natural red color.',
  '100% Premium Guntur Red Chillies',
  5,
  '500g',
  '/images/goddu_karam.png',
  'Curries, Pickles, Meat Dishes',
  '9 Months'
),
(
  'Kandi Podi',
  250.00,
  'Traditional Andhra-style roasted toor dal powder blended with sun-dried chillies, cumin, and a hint of hing. The ultimate comfort topping — mix with hot rice and ghee for an authentic village meal.',
  'Roasted Toor Dal, Guntur Chillies, Cumin, Asafoetida (Hing), Salt, Garlic',
  2,
  '200g',
  '/images/kandi_podi.png',
  'Hot Rice with Ghee, Idli, Dosa',
  '4 Months'
),
(
  'Nalla Karam',
  350.00,
  'A premium fiery blend slow-roasted with sesame seeds, peanuts, and signature Guntur chillies. This dry chutney powder has a rich nutty undertone with intense heat — popular in traditional Telugu households.',
  'Guntur Chillies, Roasted Sesame Seeds, Peanuts, Garlic, Cumin, Salt',
  4,
  '300g',
  '/images/nalla_karam.png',
  'Dosa, Idli, Rice, Upma',
  '5 Months'
),
(
  'Kobbari Karam',
  280.00,
  'Sun-dried coconut blended with Guntur chillies and roasted spices. A traditional Coastal Andhra recipe with a subtle sweetness from dried coconut balanced with sharp chilli heat.',
  'Dried Coconut, Guntur Chillies, Coriander Seeds, Cumin, Garlic, Salt',
  2,
  '200g',
  '/images/kobbari_karam.png',
  'Rice, Chapati, Idli',
  '3 Months'
),
(
  'Peanut Chutney Powder',
  220.00,
  'Freshly roasted groundnuts blended with red chillies, garlic, and cumin. Dry and shelf-stable chutney powder — the perfect companion for dosa and idli without needing fresh coconut.',
  'Roasted Groundnuts, Guntur Chillies, Garlic, Cumin, Salt, Curry Leaves',
  1,
  '200g',
  '/images/peanut_chutney_powder.png',
  'Dosa, Idli, Vada, Uthappam',
  '3 Months'
);

INSERT INTO shipping_rates (country, shipping_cost, delivery_days) VALUES
('India', 50.00, 3),
('United States', 850.00, 7),
('United Kingdom', 750.00, 6),
('Canada', 900.00, 7),
('Australia', 950.00, 8),
('Germany', 800.00, 6),
('United Arab Emirates', 500.00, 5),
('Singapore', 600.00, 5),
('Malaysia', 550.00, 5),
('New Zealand', 1000.00, 9);

INSERT INTO reviews (customer_name, country, rating, comment, created_at) VALUES
('Aarav Sharma', 'India', 5, 'Absolutely authentic! The Masala Karam takes me back to my childhood summers in Andhra. The aroma when you open the jar is incredible. Will buy again!', NOW() - INTERVAL '2 days'),
('Priya Patel', 'United States', 5, 'Finding real Goddu Karam in the US is impossible. This is the real deal — intensely hot and beautiful natural red color without any chemicals.', NOW() - INTERVAL '5 days'),
('Meenakshi Iyer', 'India', 4, 'The Kandi Podi with hot rice and ghee is exactly like what my grandmother made. Perfect grind, perfect taste. No added colors is the best part.', NOW() - INTERVAL '10 days'),
('Vikram Singh', 'United Kingdom', 5, 'Ordered the Nalla Karam and Kobbari Karam together. Both are exceptional. The sesame flavor in Nalla Karam is outstanding.', NOW() - INTERVAL '12 days'),
('Ananya Reddy', 'India', 5, 'Peanut Chutney Powder is absolutely fantastic with dosa. We have been ordering every month now. True village taste!', NOW() - INTERVAL '20 days');

-- Default admin (password: Admin@123 — change this immediately after setup)
-- Password hash for "Admin@123" using bcrypt (cost 12)
INSERT INTO admins (username, password_hash, full_name, role) VALUES
('admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMeBMSQLd316M7v6kFPGC8rJSy', 'Store Administrator', 'admin');
