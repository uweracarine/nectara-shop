-- Nectara Jewels - Development Seed Data
-- This file contains demonstration data for development and testing

-- Insert categories
INSERT INTO categories (name, slug, description, active, display_order) VALUES
    ('Necklaces and Pendants', 'necklaces-pendants', 'Elegant necklaces and pendant jewelry', TRUE, 1),
    ('Earrings', 'earrings', 'Beautiful earrings for every occasion', TRUE, 2),
    ('Rings', 'rings', 'Stunning rings including engagement and fashion styles', TRUE, 3),
    ('Bracelets and Bangles', 'bracelets-bangles', 'Wrist jewelry and bangles', TRUE, 4),
    ('Watches', 'watches', 'Fine watches and timepieces', TRUE, 5),
    ('Jewelry Sets', 'jewelry-sets', 'Coordinated jewelry sets', TRUE, 6),
    ('Handmade Jewelry', 'handmade', 'Unique handcrafted jewelry pieces', TRUE, 7),
    ('Beaded Jewelry', 'beaded', 'Jewelry featuring beautiful beads', TRUE, 8),
    ('Engagement and Wedding', 'engagement-wedding', 'Special pieces for engagements and weddings', TRUE, 9),
    ('Personalized Jewelry', 'personalized', 'Custom and personalized jewelry', TRUE, 10),
    ('Jewelry Accessories', 'accessories', 'Jewelry care and storage accessories', TRUE, 11)
ON CONFLICT DO NOTHING;

-- Insert demo seller profiles (Note: These reference user_ids that would be created via Supabase Auth)
-- For development, seed data should be created after users are authenticated
INSERT INTO seller_profiles (user_id, store_name, store_slug, description, contact_email, phone_number, address, city, country, postal_code, commission_rate, status, business_registration, tax_id)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'Rwanda Artisan Jewels', 'rwanda-artisan-jewels', 'Authentic handcrafted jewelry from Rwandan artisans', 'seller1@nectara.com', '+250788123456', 'KG 123 St', 'Kigali', 'Rwanda', '1000', 10.00, 'approved', 'REG-001', 'TAX-001'),
    ('00000000-0000-0000-0000-000000000002', 'Luxury Rings Rwanda', 'luxury-rings-rwanda', 'Premium engagement and fashion rings', 'seller2@nectara.com', '+250787654321', 'Nyarugenge District', 'Kigali', 'Rwanda', '1001', 12.00, 'approved', 'REG-002', 'TAX-002')
ON CONFLICT DO NOTHING;

-- Insert demo products (linked to demo sellers)
INSERT INTO products (seller_id, category_id, name, slug, description, price, material, color, available_quantity, approval_status, published, featured)
VALUES
    -- Product 1
    ('00000000-0000-0000-0000-000000000001', 
     (SELECT id FROM categories WHERE slug = 'necklaces-pendants' LIMIT 1),
     'Elegant Gold Pendant Necklace', 
     'elegant-gold-pendant',
     'Beautiful handcrafted gold pendant necklace made with 18K gold. Perfect for everyday wear or special occasions.',
     150000, -- 150,000 RWF
     '18K Gold',
     'Gold',
     15,
     'approved',
     true,
     true
    ),
    -- Product 2
    ('00000000-0000-0000-0000-000000000001',
     (SELECT id FROM categories WHERE slug = 'earrings' LIMIT 1),
     'Diamond Stud Earrings',
     'diamond-stud-earrings',
     'Classic diamond stud earrings with premium quality diamonds.',
     250000,
     '14K White Gold',
     'White',
     8,
     'approved',
     true,
     false
    ),
    -- Product 3
    ('00000000-0000-0000-0000-000000000002',
     (SELECT id FROM categories WHERE slug = 'rings' LIMIT 1),
     'Engagement Ring - Classic Solitaire',
     'engagement-ring-classic',
     'Timeless solitaire engagement ring with a beautiful center stone.',
     500000,
     '14K White Gold',
     'White',
     5,
     'approved',
     true,
     true
    ),
    -- Product 4
    ('00000000-0000-0000-0000-000000000002',
     (SELECT id FROM categories WHERE slug = 'bracelets-bangles' LIMIT 1),
     'Tennis Bracelet',
     'tennis-bracelet',
     'Elegant tennis bracelet featuring alternating gemstones.',
     180000,
     'Sterling Silver',
     'Silver',
     12,
     'approved',
     true,
     false
    ),
    -- Product 5
    ('00000000-0000-0000-0000-000000000001',
     (SELECT id FROM categories WHERE slug = 'handmade' LIMIT 1),
     'Handmade Beaded Necklace - Rainbow',
     'handmade-beaded-rainbow',
     'Unique handmade necklace with colorful beads. Each piece is one of a kind.',
     45000,
     'Glass Beads, String',
     'Multi-color',
     25,
     'approved',
     true,
     false
    )
ON CONFLICT DO NOTHING;

-- Create a demo collection
INSERT INTO collections (name, slug, description, featured, active, display_order)
VALUES
    ('New Arrivals', 'new-arrivals', 'Latest jewelry pieces added to our marketplace', TRUE, TRUE, 1),
    ('Best Sellers', 'best-sellers', 'Customer favorites and top-rated pieces', TRUE, TRUE, 2),
    ('Special Occasion Jewelry', 'special-occasion', 'Perfect pieces for weddings, engagements and celebrations', TRUE, TRUE, 3)
ON CONFLICT DO NOTHING;

-- Insert demo newsletter subscription
INSERT INTO newsletter_subscriptions (email, subscribed)
VALUES
    ('customer@example.com', TRUE),
    ('subscriber@nectara.com', TRUE)
ON CONFLICT DO NOTHING;
