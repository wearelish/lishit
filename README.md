# 🚀 LISHIT - Local Shop Discovery Platform

Discover local shops, products, and deals near you with GPS-powered search. Lishit connects customers with neighborhood stores and helps shop owners grow their business.

![Lishit Platform](https://img.shields.io/badge/React-18.2.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### For Customers
- 📍 GPS-based shop discovery
- 🔍 Browse shops by category
- ⭐ Shop ratings and reviews
- 💝 Wishlist functionality
- 🎯 Distance-based search results
- 🎨 Modern, responsive UI with dark theme

### For Shop Owners
- 📊 Real-time analytics dashboard
- 📈 Visitor and revenue tracking
- 🎯 Promotional ads management
- 🏪 Product listing management
- 💳 Multiple pricing tiers
- ✅ Verified shop badges

### For Admins
- 👥 User management
- 🏪 Shop verification
- 📊 Platform analytics
- 🛡️ Content moderation

## 🛠️ Tech Stack

- **Frontend:** React 18, React Router v6
- **Styling:** Tailwind CSS, Framer Motion
- **Charts:** Chart.js, Recharts
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Build Tool:** Create React App

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/wearelish/lishit.git
cd lishit
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
lishit/
├── api/                    # API integration files
│   ├── analytics.js
│   ├── auth.js
│   ├── products.js
│   └── shops.js
├── public/                 # Static files
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx
│   │   └── ShopCard.jsx
│   ├── context/          # React context providers
│   │   └── AuthContext.jsx
│   ├── pages/            # Page components
│   │   ├── Landing.jsx
│   │   ├── Auth.jsx
│   │   ├── CustomerHome.jsx
│   │   ├── ShopDetail.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Ads.jsx
│   │   └── Admin.jsx
│   ├── utils/            # Utility functions
│   │   └── mockData.js
│   ├── App.jsx           # Main app component
│   ├── index.js          # Entry point
│   └── index.css         # Global styles
├── package.json
└── tailwind.config.js
```

## 🎨 Design System

- **Primary Color:** Cyan (#00f5ff)
- **Secondary Color:** Purple (#bf00ff)
- **Accent Color:** Gold (#ffd700)
- **Background:** Dark (#050508)
- **Fonts:** 
  - Display: Bebas Neue
  - Body: DM Sans
  - Mono: JetBrains Mono

## 🔐 User Roles

1. **Customer** - Browse shops, add to wishlist, view deals
2. **Shop Owner** - Manage shop profile, products, view analytics
3. **Admin** - Platform management, shop verification

## 📦 Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🌐 Deployment

The project is configured for Vercel deployment with `vercel.json`. Simply connect your GitHub repo to Vercel for automatic deployments.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Made with ⚡ by the Lishit Team

## 📞 Contact

For questions or support, reach out to us at [contact@lishit.com](mailto:contact@lishit.com)

---

⭐ Star this repo if you find it helpful!
