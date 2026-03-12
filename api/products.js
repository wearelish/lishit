// api/products.js
const products = [
  { id: 1, shop_id: 1, name: 'iPhone 15 Pro', price: 134900, discount: 5, offer_text: 'Launch Offer' },
  { id: 2, shop_id: 1, name: 'Sony WH-1000XM5', price: 29990, discount: 15, offer_text: 'Weekend Deal' },
  { id: 3, shop_id: 2, name: 'Cold Brew Coffee', price: 299, discount: 0, offer_text: '' },
];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { shop_id } = req.query;

  if (req.method === 'GET') {
    if (shop_id) return res.json(products.filter(p => p.shop_id === parseInt(shop_id)));
    return res.json(products);
  }

  if (req.method === 'POST') {
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    return res.status(201).json(newProduct);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
