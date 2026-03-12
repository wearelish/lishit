// api/analytics.js
const analytics = {
  1: [
    { day: 'Mon', visitors: 45, views: 120, wishlist: 8 },
    { day: 'Tue', visitors: 62, views: 185, wishlist: 12 },
    { day: 'Wed', visitors: 38, views: 95, wishlist: 5 },
    { day: 'Thu', visitors: 78, views: 210, wishlist: 15 },
    { day: 'Fri', visitors: 95, views: 280, wishlist: 22 },
    { day: 'Sat', visitors: 120, views: 340, wishlist: 30 },
    { day: 'Sun', visitors: 88, views: 245, wishlist: 18 },
  ]
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { shop_id } = req.query;
  if (!shop_id) return res.status(400).json({ error: 'shop_id required' });

  const data = analytics[parseInt(shop_id)] || [];
  const totals = data.reduce((acc, d) => ({
    visitors: acc.visitors + d.visitors,
    views: acc.views + d.views,
    wishlist: acc.wishlist + d.wishlist
  }), { visitors: 0, views: 0, wishlist: 0 });

  return res.json({ shop_id: parseInt(shop_id), daily: data, totals });
};
