-- Nectara Jewels - Row Level Security Policies
-- Phase: Authorization and data access control

-- Enable Row Level Security for all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_fulfillments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;

-- ===== PROFILES POLICIES =====
-- Public can read active profiles (for store info)
CREATE POLICY "profiles_public_read" ON profiles FOR SELECT
    USING (status = 'active');

-- Users can read their own profile
CREATE POLICY "profiles_user_read" ON profiles FOR SELECT
    USING (auth.uid()::text = id);

-- Users can update their own profile
CREATE POLICY "profiles_user_update" ON profiles FOR UPDATE
    USING (auth.uid()::text = id)
    WITH CHECK (auth.uid()::text = id AND role = old.role);

-- Service role can perform admin functions
CREATE POLICY "profiles_service_all" ON profiles FOR ALL
    USING (current_setting('role') = 'authenticated' AND
           (SELECT role FROM profiles WHERE id = auth.uid()::text) = 'admin');

-- ===== SELLER_PROFILES POLICIES =====
-- Public can read approved seller profiles
CREATE POLICY "seller_profiles_public_read" ON seller_profiles FOR SELECT
    USING (status = 'approved');

-- Sellers can read their own profile
CREATE POLICY "seller_profiles_seller_read" ON seller_profiles FOR SELECT
    USING (user_id = auth.uid()::text);

-- Sellers can update their own profile
CREATE POLICY "seller_profiles_seller_update" ON seller_profiles FOR UPDATE
    USING (user_id = auth.uid()::text)
    WITH CHECK (user_id = auth.uid()::text);

-- Admins can read all seller profiles
CREATE POLICY "seller_profiles_admin_read" ON seller_profiles FOR SELECT
    USING ((SELECT role FROM profiles WHERE id = auth.uid()::text) = 'admin');

-- Admins can update seller profiles
CREATE POLICY "seller_profiles_admin_update" ON seller_profiles FOR UPDATE
    USING ((SELECT role FROM profiles WHERE id = auth.uid()::text) = 'admin');

-- ===== ADDRESSES POLICIES =====
-- Users can read their own addresses
CREATE POLICY "addresses_user_read" ON addresses FOR SELECT
    USING (user_id = auth.uid()::text);

-- Users can create addresses
CREATE POLICY "addresses_user_create" ON addresses FOR INSERT
    WITH CHECK (user_id = auth.uid()::text);

-- Users can update their own addresses
CREATE POLICY "addresses_user_update" ON addresses FOR UPDATE
    USING (user_id = auth.uid()::text)
    WITH CHECK (user_id = auth.uid()::text);

-- Users can delete their own addresses
CREATE POLICY "addresses_user_delete" ON addresses FOR DELETE
    USING (user_id = auth.uid()::text);

-- ===== CATEGORIES POLICIES =====
-- Everyone can read active categories
CREATE POLICY "categories_public_read" ON categories FOR SELECT
    USING (active = true);

-- Only admins can manage categories
CREATE POLICY "categories_admin_all" ON categories FOR ALL
    USING ((SELECT role FROM profiles WHERE id = auth.uid()::text) = 'admin');

-- ===== PRODUCTS POLICIES =====
-- Public can read published and approved products from approved sellers
CREATE POLICY "products_public_read" ON products FOR SELECT
    USING (published = true AND 
           approval_status = 'approved' AND 
           (SELECT status FROM seller_profiles WHERE user_id = seller_id) = 'approved');

-- Sellers can read their own products
CREATE POLICY "products_seller_read" ON products FOR SELECT
    USING (seller_id = auth.uid()::text);

-- Sellers can create products
CREATE POLICY "products_seller_create" ON products FOR INSERT
    WITH CHECK (seller_id = auth.uid()::text AND 
                (SELECT role FROM profiles WHERE id = auth.uid()::text) = 'seller');

-- Sellers can update their own products
CREATE POLICY "products_seller_update" ON products FOR UPDATE
    USING (seller_id = auth.uid()::text)
    WITH CHECK (seller_id = auth.uid()::text);

-- Admins can read all products
CREATE POLICY "products_admin_read" ON products FOR SELECT
    USING ((SELECT role FROM profiles WHERE id = auth.uid()::text) = 'admin');

-- Admins can update product approval status
CREATE POLICY "products_admin_update" ON products FOR UPDATE
    USING ((SELECT role FROM profiles WHERE id = auth.uid()::text) = 'admin');

-- ===== PRODUCT_IMAGES POLICIES =====
-- Public can read images for published products
CREATE POLICY "product_images_public_read" ON product_images FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM products WHERE products.id = product_images.product_id 
        AND published = true AND approval_status = 'approved'
    ));

-- Sellers can read images for their products
CREATE POLICY "product_images_seller_read" ON product_images FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM products WHERE products.id = product_images.product_id 
        AND seller_id = auth.uid()::text
    ));

-- Sellers can manage images for their products
CREATE POLICY "product_images_seller_manage" ON product_images FOR ALL
    USING (EXISTS (
        SELECT 1 FROM products WHERE products.id = product_images.product_id 
        AND seller_id = auth.uid()::text
    ));

-- ===== CARTS POLICIES =====
-- Users can read and manage their own cart
CREATE POLICY "carts_user_all" ON carts FOR ALL
    USING (buyer_id = auth.uid()::text);

-- ===== CART_ITEMS POLICIES =====
-- Users can manage items in their own cart
CREATE POLICY "cart_items_user_all" ON cart_items FOR ALL
    USING (EXISTS (
        SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id 
        AND buyer_id = auth.uid()::text
    ));

-- ===== WISHLIST POLICIES =====
-- Users can read and manage their wishlist
CREATE POLICY "wishlist_user_read" ON wishlist FOR SELECT
    USING (buyer_id = auth.uid()::text);

CREATE POLICY "wishlist_user_manage" ON wishlist FOR ALL
    USING (buyer_id = auth.uid()::text);

-- ===== ORDERS POLICIES =====
-- Buyers can read their own orders
CREATE POLICY "orders_buyer_read" ON orders FOR SELECT
    USING (buyer_id = auth.uid()::text);

-- Buyers can create orders
CREATE POLICY "orders_buyer_create" ON orders FOR INSERT
    WITH CHECK (buyer_id = auth.uid()::text AND 
                (SELECT role FROM profiles WHERE id = auth.uid()::text) = 'buyer');

-- Sellers can read orders that contain their products
CREATE POLICY "orders_seller_read" ON orders FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM order_items WHERE order_items.order_id = orders.id 
        AND seller_id = auth.uid()::text
    ));

-- Admins can read all orders
CREATE POLICY "orders_admin_read" ON orders FOR SELECT
    USING ((SELECT role FROM profiles WHERE id = auth.uid()::text) = 'admin');

-- ===== ORDER_ITEMS POLICIES =====
-- Buyers can read items from their orders
CREATE POLICY "order_items_buyer_read" ON order_items FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM orders WHERE orders.id = order_items.order_id 
        AND buyer_id = auth.uid()::text
    ));

-- Sellers can read their order items
CREATE POLICY "order_items_seller_read" ON order_items FOR SELECT
    USING (seller_id = auth.uid()::text);

-- ===== SELLER_FULFILLMENTS POLICIES =====
-- Sellers can manage fulfillments for their orders
CREATE POLICY "seller_fulfillments_seller_all" ON seller_fulfillments FOR ALL
    USING (seller_id = auth.uid()::text);

-- Buyers can read fulfillments for their orders
CREATE POLICY "seller_fulfillments_buyer_read" ON seller_fulfillments FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM orders WHERE orders.id = seller_fulfillments.order_id 
        AND buyer_id = auth.uid()::text
    ));

-- ===== PAYMENTS POLICIES =====
-- Buyers can read payments for their orders
CREATE POLICY "payments_buyer_read" ON payments FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM orders WHERE orders.id = payments.order_id 
        AND buyer_id = auth.uid()::text
    ));

-- Admins can read all payments
CREATE POLICY "payments_admin_read" ON payments FOR SELECT
    USING ((SELECT role FROM profiles WHERE id = auth.uid()::text) = 'admin');

-- ===== NOTIFICATIONS POLICIES =====
-- Users can read their own notifications
CREATE POLICY "notifications_user_read" ON notifications FOR SELECT
    USING (user_id = auth.uid()::text);

-- Users can update their own notifications
CREATE POLICY "notifications_user_update" ON notifications FOR UPDATE
    USING (user_id = auth.uid()::text);

-- ===== SUPPORT_TICKETS POLICIES =====
-- Users can read and create their own tickets
CREATE POLICY "support_tickets_user_all" ON support_tickets FOR ALL
    USING (user_id = auth.uid()::text);

-- Admins can read all support tickets
CREATE POLICY "support_tickets_admin_read" ON support_tickets FOR SELECT
    USING ((SELECT role FROM profiles WHERE id = auth.uid()::text) = 'admin');

-- ===== REVIEWS POLICIES =====
-- Public can read approved reviews
CREATE POLICY "reviews_public_read" ON reviews FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM products WHERE products.id = reviews.product_id 
        AND published = true AND approval_status = 'approved'
    ));

-- Buyers can create reviews for their purchased products
CREATE POLICY "reviews_buyer_create" ON reviews FOR INSERT
    WITH CHECK (buyer_id = auth.uid()::text);

-- Buyers can update their own reviews
CREATE POLICY "reviews_buyer_update" ON reviews FOR UPDATE
    USING (buyer_id = auth.uid()::text);

-- ===== SELLER_PAYOUTS POLICIES =====
-- Sellers can read their own payouts
CREATE POLICY "seller_payouts_seller_read" ON seller_payouts FOR SELECT
    USING (seller_id = auth.uid()::text);

-- Admins can read and update all payouts
CREATE POLICY "seller_payouts_admin_all" ON seller_payouts FOR ALL
    USING ((SELECT role FROM profiles WHERE id = auth.uid()::text) = 'admin');

-- ===== AUDIT_LOGS POLICIES =====
-- Only admins can read audit logs
CREATE POLICY "audit_logs_admin_read" ON audit_logs FOR SELECT
    USING ((SELECT role FROM profiles WHERE id = auth.uid()::text) = 'admin');

-- ===== NEWSLETTER_SUBSCRIPTIONS POLICIES =====
-- Anyone can create a subscription
CREATE POLICY "newsletter_subscriptions_public_create" ON newsletter_subscriptions FOR INSERT
    WITH CHECK (true);

-- Only admins can read and manage subscriptions
CREATE POLICY "newsletter_subscriptions_admin_all" ON newsletter_subscriptions FOR ALL
    USING ((SELECT role FROM profiles WHERE id = auth.uid()::text) = 'admin');
