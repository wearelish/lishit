// Vercel Serverless Function - /api/auth
const users = [
  { id: 1, name: 'Rahul Mehta', email: 'customer@test.com', password: 'customer123', role: 'customer' },
  { id: 2, name: 'Ankit Sharma', email: 'owner@test.com', password: 'owner123', role: 'owner' },
  { id: 0, name: 'Admin', email: 'admin@lishit.com', password: 'admin123', role: 'admin' },
];

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'POST') {
    const { email, password, name, role } = req.body || {};
    const path = req.url.includes('register') ? 'register' : 'login';

    if (path === 'login') {
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      const { password: _, ...safeUser } = user;
      return res.status(200).json({ success: true, user: safeUser, token: `mock-jwt-${user.role}-${Date.now()}` });
    }

    if (path === 'register') {
      const newUser = { id: Date.now(), name, email, role: role || 'customer' };
      return res.status(201).json({ success: true, user: newUser, token: `mock-jwt-${newUser.role}-${Date.now()}` });
    }
  }
  res.status(405).json({ error: 'Method not allowed' });
};
