// Vercel Serverless Function - /api/shops
const shops = [
  { id: 1, owner_id: 2, shop_name: "TechZone Electronics", description: "Latest gadgets, phones & accessories", category: "Electronics", address: "42 MG Road, Bangalore", latitude: 12.9716, longitude: 77.5946, rating: 4.8, approved: true, featured: true },
  { id: 2, owner_id: 3, shop_name: "Green Harvest Organic", description: "Fresh organic vegetables & fruits daily", category: "Grocery", address: "15 JP Nagar, Bangalore", latitude: 12.9080, longitude: 77.5840, rating: 4.5, approved: true, featured: false },
];

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'GET') {
    const { category, approved } = req.query;
    let result = shops;
    if (category) result = result.filter(s => s.category === category);
    if (approved === 'true') result = result.filter(s => s.approved);
    return res.status(200).json({ success: true, data: result });
  }
  res.status(405).json({ error: 'Method not allowed' });
};
