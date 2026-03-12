// Mock data for demo (replace with real API calls in production)

export const MOCK_USERS = [
  { id: 1, name: 'Alex Kumar', email: 'customer@test.com', password: 'customer123', role: 'customer', avatar: null },
  { id: 2, name: 'Priya Singh', email: 'owner@test.com', password: 'owner123', role: 'owner', avatar: null },
  { id: 3, name: 'Admin', email: 'admin@lishit.com', password: 'admin123', role: 'admin', avatar: null },
];

export const MOCK_SHOPS = [
  {
    id: 1, owner_id: 2, shop_name: 'TechZone Electronics', description: 'Latest gadgets, mobiles, and accessories at unbeatable prices.',
    category: 'Electronics', address: 'MG Road, Bengaluru', latitude: 12.9716, longitude: 77.5946,
    rating: 4.7, approved: true, distance: 0.3, featured: true,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    tags: ['Gadgets', 'Phones', 'Laptops'], open: true, openTime: '9AM - 9PM'
  },
  {
    id: 2, owner_id: 2, shop_name: 'Aroma Cafe & Bakery', description: 'Artisan coffee, fresh pastries, and a cozy ambiance.',
    category: 'Food & Beverage', address: 'Indiranagar, Bengaluru', latitude: 12.9784, longitude: 77.6408,
    rating: 4.9, approved: true, distance: 0.7, featured: false,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80',
    tags: ['Coffee', 'Bakery', 'Vegan'], open: true, openTime: '7AM - 11PM'
  },
  {
    id: 3, owner_id: 2, shop_name: 'Fusion Wardrobe', description: 'Designer ethnic and western wear for every occasion.',
    category: 'Fashion', address: 'Koramangala, Bengaluru', latitude: 12.9352, longitude: 77.6245,
    rating: 4.5, approved: true, distance: 1.2, featured: true,
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80',
    tags: ['Ethnic', 'Western', 'Designer'], open: false, openTime: '10AM - 8PM'
  },
  {
    id: 4, owner_id: 2, shop_name: 'Wellness Hub', description: 'Organic products, supplements, and holistic wellness solutions.',
    category: 'Health & Wellness', address: 'Jayanagar, Bengaluru', latitude: 12.9308, longitude: 77.5836,
    rating: 4.6, approved: true, distance: 2.1, featured: false,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80',
    tags: ['Organic', 'Supplements', 'Holistic'], open: true, openTime: '8AM - 10PM'
  },
  {
    id: 5, owner_id: 2, shop_name: 'BookNest', description: 'Rare books, stationery, and reading accessories.',
    category: 'Books & Stationery', address: 'Malleshwaram, Bengaluru', latitude: 13.0035, longitude: 77.5710,
    rating: 4.8, approved: true, distance: 3.4, featured: false,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80',
    tags: ['Books', 'Art', 'Stationery'], open: true, openTime: '10AM - 7PM'
  },
  {
    id: 6, owner_id: 2, shop_name: 'AutoCare Pro', description: 'Professional car detailing, accessories, and maintenance.',
    category: 'Automotive', address: 'Whitefield, Bengaluru', latitude: 12.9698, longitude: 77.7499,
    rating: 4.4, approved: true, distance: 5.8, featured: false,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80',
    tags: ['Detailing', 'Accessories', 'Parts'], open: true, openTime: '8AM - 6PM'
  },
];

export const MOCK_PRODUCTS = [
  { id: 1, shop_id: 1, name: 'iPhone 15 Pro', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&q=80', price: 134900, discount: 5, offer_text: 'Launch Offer' },
  { id: 2, shop_id: 1, name: 'Sony WH-1000XM5', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80', price: 29990, discount: 15, offer_text: 'Weekend Deal' },
  { id: 3, shop_id: 1, name: 'MacBook Air M3', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80', price: 114900, discount: 8, offer_text: 'Student Discount' },
  { id: 4, shop_id: 2, name: 'Cold Brew Coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&q=80', price: 299, discount: 0, offer_text: '' },
  { id: 5, shop_id: 2, name: 'Croissant Platter', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&q=80', price: 450, discount: 10, offer_text: 'Morning Special' },
  { id: 6, shop_id: 3, name: 'Silk Kurta Set', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&q=80', price: 3999, discount: 20, offer_text: 'Festive Sale' },
];

export const MOCK_ADS = [
  { id: 1, shop_id: 1, shop_name: 'TechZone Electronics', text: '🔥 Mega Tech Sale — Up to 40% OFF on all Electronics this weekend!', category: 'Electronics', gradient: 'from-cyan-500 to-blue-600' },
  { id: 2, shop_id: 2, shop_name: 'Aroma Cafe & Bakery', text: '☕ Buy 2 Specialty Coffees, Get 1 FREE — Every Tuesday & Thursday!', category: 'Food', gradient: 'from-amber-500 to-orange-600' },
  { id: 3, shop_id: 3, shop_name: 'Fusion Wardrobe', text: '👗 New Festive Collection Arrived — Flat 25% OFF for first 50 customers!', category: 'Fashion', gradient: 'from-purple-500 to-pink-600' },
];

export const MOCK_REVIEWS = [
  { id: 1, shop_id: 1, user_name: 'Rahul M.', rating: 5, comment: 'Best electronics store in the area. Super helpful staff and genuine products!', date: '2024-03-10' },
  { id: 2, shop_id: 1, user_name: 'Sneha K.', rating: 4, comment: 'Good collection, slightly pricey but quality is top-notch.', date: '2024-03-08' },
  { id: 3, shop_id: 2, user_name: 'Arjun T.', rating: 5, comment: 'The cold brew here is absolutely incredible. My go-to spot!', date: '2024-03-11' },
];

export const CATEGORIES = [
  { name: 'Electronics', icon: '⚡', color: '#00f5ff' },
  { name: 'Food & Beverage', icon: '🍜', color: '#ff6b35' },
  { name: 'Fashion', icon: '👗', color: '#bf00ff' },
  { name: 'Health & Wellness', icon: '💊', color: '#00ff88' },
  { name: 'Books & Stationery', icon: '📚', color: '#ffd700' },
  { name: 'Automotive', icon: '🚗', color: '#ff4757' },
  { name: 'Home & Living', icon: '🏠', color: '#ff6b9d' },
  { name: 'Sports & Fitness', icon: '🏃', color: '#26de81' },
];

// Simple JWT simulation for frontend demo
export const generateToken = (user) => {
  const payload = btoa(JSON.stringify({ id: user.id, email: user.email, role: user.role, exp: Date.now() + 86400000 }));
  return `lishit.${payload}.demo`;
};

export const mockLogin = (email, password) => {
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  if (!user) return null;
  const { password: _, ...safeUser } = user;
  return { user: safeUser, token: generateToken(safeUser) };
};

export const mockRegister = (name, email, password, role = 'customer') => {
  const exists = MOCK_USERS.find(u => u.email === email);
  if (exists) return { error: 'Email already registered' };
  const newUser = { id: Date.now(), name, email, role };
  return { user: newUser, token: generateToken(newUser) };
};
