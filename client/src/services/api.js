import axios from 'axios';

const api = axios.create({ baseURL: '' });

// Attach JWT token if present
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Mock Data ──────────────────────────────────────────────────────────────
const MOCK_PRODUCTS = [
  { id: 1, name: 'Masala Karam', price: 300, description: 'Versatile traditional blend of sun-dried Guntur chillies, toasted coriander, cumin, fenugreek, and mustard seeds. Our grandmother\'s South Indian recipe.', ingredients: 'Guntur Chillies, Coriander Seeds, Cumin, Garlic, Salt, Turmeric, Fenugreek', spice_level: 3, weight: '250g', image: '/images/masala_karam.png', best_with: 'Rice, Sambar, Dal', shelf_life: '6 Months' },
  { id: 2, name: 'Goddu Karam', price: 600, description: 'Pure fiery Guntur Sannam chilli powder. Sun-dried, stone-ground. Zero additives — just intense heat and deep natural red.', ingredients: '100% Premium Guntur Red Chillies', spice_level: 5, weight: '500g', image: '/images/goddu_karam.png', best_with: 'Curries, Pickles, Meat', shelf_life: '9 Months' },
  { id: 3, name: 'Kandi Podi', price: 250, description: 'Traditional Andhra roasted toor dal powder with sun-dried chillies. Mix with hot rice and ghee for the ultimate comfort village meal.', ingredients: 'Roasted Toor Dal, Guntur Chillies, Cumin, Asafoetida, Salt, Garlic', spice_level: 2, weight: '200g', image: '/images/kandi_podi.png', best_with: 'Hot Rice with Ghee, Idli, Dosa', shelf_life: '4 Months' },
  { id: 4, name: 'Nalla Karam', price: 350, description: 'Slow-roasted with sesame seeds and peanuts. A rich nutty dry chutney powder with intense heat — beloved in traditional Telugu households.', ingredients: 'Guntur Chillies, Sesame Seeds, Peanuts, Garlic, Cumin, Salt', spice_level: 4, weight: '300g', image: '/images/nalla_karam.png', best_with: 'Dosa, Idli, Rice, Upma', shelf_life: '5 Months' },
  { id: 5, name: 'Kobbari Karam', price: 280, description: 'Sun-dried coconut blended with Guntur chillies. Coastal Andhra recipe with subtle sweetness balanced by sharp chilli heat.', ingredients: 'Dried Coconut, Guntur Chillies, Coriander Seeds, Cumin, Garlic, Salt', spice_level: 2, weight: '200g', image: '/images/kobbari_karam.png', best_with: 'Rice, Chapati, Idli', shelf_life: '3 Months' },
  { id: 6, name: 'Peanut Chutney Powder', price: 220, description: 'Freshly roasted groundnuts with red chillies, garlic, and cumin. Dry shelf-stable chutney powder — the perfect dosa and idli companion.', ingredients: 'Roasted Groundnuts, Guntur Chillies, Garlic, Cumin, Salt, Curry Leaves', spice_level: 1, weight: '200g', image: '/images/peanut_chutney_powder.png', best_with: 'Dosa, Idli, Vada', shelf_life: '3 Months' },
];

const MOCK_REVIEWS = [
  { id: 1, customer_name: 'Aarav Sharma', country: 'India', rating: 5, comment: 'Absolutely authentic! The Masala Karam takes me back to my childhood in Andhra. The aroma is incredible.', created_at: new Date(Date.now() - 2*86400000).toISOString() },
  { id: 2, customer_name: 'Priya Patel', country: 'United States', rating: 5, comment: 'Finding real Goddu Karam in the US is impossible. This is the real deal — intensely hot and natural red without chemicals.', created_at: new Date(Date.now() - 5*86400000).toISOString() },
  { id: 3, customer_name: 'Meenakshi Iyer', country: 'India', rating: 4, comment: 'The Kandi Podi with hot rice and ghee is exactly like my grandmother made. Perfect grind, perfect taste.', created_at: new Date(Date.now() - 10*86400000).toISOString() },
  { id: 4, customer_name: 'Vikram Singh', country: 'United Kingdom', rating: 5, comment: 'Ordered Nalla Karam and Kobbari Karam together. Both are exceptional. The sesame flavor in Nalla Karam is outstanding.', created_at: new Date(Date.now() - 12*86400000).toISOString() },
  { id: 5, customer_name: 'Ananya Reddy', country: 'India', rating: 5, comment: 'Peanut Chutney Powder with dosa is absolutely fantastic. We order every month. True village taste!', created_at: new Date(Date.now() - 20*86400000).toISOString() },
];

// ─── API functions ───────────────────────────────────────────────────────────
export const getProducts = async () => {
  try { return (await api.get('/api/products')).data; }
  catch { return MOCK_PRODUCTS; }
};

export const getReviews = async () => {
  try { return (await api.get('/api/reviews')).data; }
  catch { return MOCK_REVIEWS; }
};

export const submitReview = async (data) => {
  try { return (await api.post('/api/reviews', data)).data; }
  catch { return { id: Date.now(), ...data, created_at: new Date().toISOString() }; }
};

export const placeIndiaOrder = async (data) => {
  try { return (await api.post('/api/orders/india', data)).data; }
  catch {
    const price = data.product.includes('Goddu') ? 600 : data.product.includes('Nalla') ? 350 : data.product.includes('Kandi') ? 250 : data.product.includes('Kobbari') ? 280 : data.product.includes('Peanut') ? 220 : 300;
    const subtotal = price * data.quantity;
    const shipping = 50;
    const gst = +(subtotal * 0.18).toFixed(2);
    return { success: true, order: { id: Math.floor(Math.random()*90000+10000), customer_name: data.name, email: data.email, phone: data.phone, country: 'India', state: data.state, city: data.city, address: data.address, postal_code: data.pincode, product: data.product, quantity: data.quantity, subtotal, shipping, gst, total: subtotal+shipping+gst, payment_status: 'Pending', created_at: new Date().toISOString() } };
  }
};

export const placeInternationalOrder = async (data) => {
  try { return (await api.post('/api/orders/international', data)).data; }
  catch {
    const price = data.product.includes('Goddu') ? 600 : data.product.includes('Nalla') ? 350 : data.product.includes('Kandi') ? 250 : data.product.includes('Kobbari') ? 280 : data.product.includes('Peanut') ? 220 : 300;
    const subtotal = price * data.quantity;
    const shipping = data.country === 'United Arab Emirates' ? 500 : data.country === 'Singapore' ? 600 : data.country === 'United Kingdom' ? 750 : 850;
    const gst = +(subtotal * 0.18).toFixed(2);
    return { success: true, order: { id: Math.floor(Math.random()*90000+10000), customer_name: data.name, email: data.email, phone: data.phone, country: data.country, address: data.address, postal_code: data.postal_code, product: data.product, quantity: data.quantity, subtotal, shipping, gst, total: subtotal+shipping+gst, payment_status: 'Pending', created_at: new Date().toISOString() } };
  }
};

export const submitContact = async (data) => {
  try { return (await api.post('/api/contact', data)).data; }
  catch { return { success: true }; }
};

// Generic createOrder — used by CartPage / CartDrawer
export const createOrder = async (data) => {
  try {
    return (await api.post('/api/orders/india', {
      name: data.customer_name,
      email: data.email || 'customer@mirchistore.com',
      phone: data.phone,
      address: data.address,
      city: data.city || '',
      state: data.state || 'Andhra Pradesh',
      pincode: data.pincode || '',
      product: data.product_name || 'Mixed Spice Order',
      quantity: data.quantity || 1,
    })).data;
  } catch {
    return {
      success: true,
      order_id: Math.floor(Math.random() * 90000 + 10000),
      customer_name: data.customer_name,
      total_amount: data.total_amount,
    };
  }
};

export const getDashboardStats = async () => {
  try { return (await api.get('/api/stats')).data; }
  catch {
    return { success: true, stats: { totalOrders: 23, totalRevenue: 14800, countryDistribution: [{ country: 'India', count: 14, revenue: 6200 }, { country: 'United States', count: 5, revenue: 5100 }, { country: 'United Kingdom', count: 3, revenue: 2800 }, { country: 'UAE', count: 1, revenue: 700 }], recentReviews: MOCK_REVIEWS, recentOrders: [{ id: 10561, customer_name: 'Aarav Sharma', phone: '9876543210', country: 'India', product: 'Masala Karam', quantity: 2, total: 758, payment_status: 'Pending', created_at: new Date(Date.now()-2*3600000).toISOString() }, { id: 10560, customer_name: 'Priya Patel', phone: '+1 555-0199', country: 'United States', product: 'Goddu Karam', quantity: 1, total: 1558, payment_status: 'Pending', created_at: new Date(Date.now()-10*3600000).toISOString() }] } };
  }
};

export const adminLogin = async (username, password) => {
  const res = await api.post('/api/auth/login', { username, password });
  return res.data;
};

export const verifyAdminToken = async () => {
  const token = sessionStorage.getItem('adminToken');
  if (!token) return false;
  try {
    const res = await api.get('/api/auth/verify');
    return res.data.valid;
  } catch { return false; }
};
