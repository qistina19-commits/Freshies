# SmartKitchen AI - Freshies 🍽️

An AI-powered Food & Beverage expense and stock tracking tool designed to help restaurant owners and F&B businesses reduce product waste, optimize inventory, and maximize profitability.

**Status:** Currently in BETA testing phase

---

## 📋 Table of Contents
- [Features](#features)
- [System Requirements](#system-requirements)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Repository Structure](#repository-structure)
- [API Documentation](#api-documentation)
- [Key Features Overview](#key-features-overview)
- [Coming Soon](#coming-soon)

---

## ✨ Features

### Core Functionality
- **AI-Powered Waste Prediction**: Machine learning algorithms analyze historical data and external factors to predict and prevent food waste
- **Real-Time Inventory Tracking**: Monitor stock levels, expiration dates, and usage patterns
- **Intelligent Purchasing**: AI recommendations for optimal ordering to reduce waste and costs
- **Waste Analytics**: Detailed reports on wasted items and financial impact
- **Revenue Forecasting**: 7-day demand forecasting with confidence levels
- **Environmental Impact**: Carbon footprint tracking for sustainability goals
- **User-Friendly Dashboard**: Real-time metrics and actionable insights

---

## 🖥️ System Requirements

### Frontend
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Internet connection

### Backend
- Node.js (v14 or higher)
- npm or yarn
- WebSocket support

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/qistina19-commits/Freshies.git
cd Freshies
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Server
```bash
node server.js
```

The server will run on `http://localhost:8080` by default. You can change the port by setting the `PORT` environment variable:
```bash
PORT=3000 node server.js
```

### Step 4: Access the Application
1. Open your browser and navigate to `http://localhost:8080`
2. You'll be directed to the login page
3. Enter any email and password (currently in demo mode - no actual authentication)
4. Click "Sign In" to access the dashboard

---

## 📖 Usage Guide

### 1. **Login Page** (`loginpage.html`)
- Entry point to the application
- Features: Email/password input, "Remember me" checkbox, "Forgot password" link
- Currently in demo mode - any credentials will authenticate you
- After login, redirects to the dashboard

### 2. **Dashboard** (`dashboard.html`)
Main hub with key metrics and AI recommendations:

**Key Metrics Displayed:**
- 📊 Today's Revenue
- 🗑️ Food Waste (in kg)
- 💰 Money Saved
- 🌍 Carbon Saved

**Features:**
- **AI Strategy Recommendation**: Smart suggestion panel showing AI-driven decisions (e.g., adjust portions based on weather/demand)
- **Inventory Alerts**: Real-time warnings for low stock and expiring items
- **7-Day Demand Forecast**: Sales predictions with confidence percentages
- **System Logs**: Activity history showing automated actions

### 3. **Inventory** (`inventory.html`)
Track and manage all food items and ingredients:
- View current stock levels
- Monitor expiration dates
- Track usage history
- Add/edit items
- Category management

### 4. **Waste Management** (`waste.html`)
Analyze and reduce food waste:
- View waste patterns by item
- Identify high-waste products
- Track waste trends over time
- Calculate financial impact of waste
- View waste reduction recommendations

### 5. **AI Engine** (`aidecision.html`)
Advanced AI decision-making insights:
- View AI prediction models
- Analyze decision factors
- See confidence scores for recommendations
- Historical accuracy metrics
- AI model performance monitoring

### 6. **Purchasing** (`purchasing.html`)
Optimize buying decisions:
- AI-generated purchase orders
- Supplier management
- Price optimization
- Bulk discount calculator
- Purchase history
- Automated reorder suggestions

### 7. **Reports** (`reports.html`)
Comprehensive analytics and reporting:
- Revenue analysis
- Waste reduction metrics
- Cost savings summary
- Environmental impact reports
- Custom date range filtering
- Export reports (if enabled)

### 8. **Settings** (`settings.html`)
Configure your account and preferences:
- User profile management
- Business location settings
- Notification preferences
- Data retention policies
- Integration settings
- API key management

---

## 📁 Repository Structure

```
Freshies/
├── README.md                  # This file - project documentation
├── server.js                  # Express server with WebSocket support
├── loginpage.html             # User login interface
├── dashboard.html             # Main dashboard with key metrics
├── inventory.html             # Inventory management page
├── waste.html                 # Waste tracking and analysis
├── aidecision.html            # AI engine insights and decisions
├── purchasing.html            # Purchase order management
├── reports.html               # Analytics and reporting
├── settings.html              # User preferences and settings
└── public/                    # (Optional) Static assets directory
```

---

## 🔌 API Documentation

### Server Setup
- **Framework**: Express.js with WebSocket support
- **Port**: 8080 (configurable via `PORT` environment variable)
- **CORS**: Enabled for cross-origin requests

### REST API Endpoints

#### 1. Get Reports Data
```
GET /api/reports
```
**Response:**
```json
{
  "totalRevenue": 124500,
  "foodSaved": 450,
  "carbonOffset": 82,
  "aiAccuracy": 94.2,
  "revenueChange": "↑ 5.2%",
  "foodChange": "↑ 12 kg today",
  "carbonChange": "↑ 2.1 kg today",
  "topItems": [...],
  "wastedItems": [...],
  "chartData": {...}
}
```

#### 2. Update Reports Data
```
POST /api/reports/update
```
**Request Body:**
```json
{
  "totalRevenue": 125000,
  "foodSaved": 460
}
```

#### 3. Update Specific Metric
```
POST /api/reports/:metric
```
**Request Body:**
```json
{
  "value": 125000
}
```
**Example:**
```
POST /api/reports/totalRevenue
Content-Type: application/json

{"value": 125000}
```

### WebSocket Connection

Connect to the WebSocket server to receive real-time updates:
```javascript
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('Connected');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received update:', data);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};
```

---

## 🎯 Key Features Overview

### AI Decision Engine
- Analyzes historical sales patterns
- Considers external factors (weather, holidays, events)
- Generates predictive recommendations
- Reduces waste by up to 40% (Target)

### Real-Time Analytics
- Live dashboard updates via WebSocket
- 5-second refresh interval for metrics
- Instantaneous alert notifications
- Historical trend analysis

### Sustainability Tracking
- Carbon footprint calculations
- Environmental impact metrics
- Waste reduction impact
- Green business insights

### Data Visualization
- Chart.js integration (implied from data structure)
- Monthly revenue trends
- Waste reduction charts
- Top-performing items graphs

---

## ⚙️ Configuration

### Environment Variables
```
PORT=8080              # Server port (default: 8080)
NODE_ENV=development   # Environment (development/production)
```

### Database (Future)
Currently uses in-memory data store. For production, replace with:
- MongoDB
- PostgreSQL
- MySQL
- Firebase

---

## 🔐 Security Notes

**Current Status (BETA):**
- No actual authentication implemented
- Demo mode accepts any credentials
- In-memory data (not persisted)

**Before Production:**
- Implement proper authentication (JWT, OAuth2)
- Add database persistence
- Enable HTTPS/WSS
- Add input validation and sanitization
- Implement rate limiting
- Add user role-based access control

---

## 🚀 Getting Started - Quick Demo

1. **Start the server:**
   ```bash
   npm install
   node server.js
   ```

2. **Open browser:**
   ```
   http://localhost:8080
   ```

3. **Login:**
   - Email: any@email.com
   - Password: anything
   - Click "Sign In"

4. **Explore:**
   - View the dashboard with live metrics
   - Navigate through different sections
   - Check real-time data updates

---

## 📊 Demo Data

The application comes with sample data:
- **Total Revenue**: RM 124,500
- **Food Saved**: 450 kg
- **Carbon Offset**: 82 kg
- **AI Accuracy**: 94.2%

Live data simulates fluctuations every 5 seconds for demonstration purposes.

---

## 🐛 Known Issues & Limitations

- **BETA Status**: Features may change significantly
- **Authentication**: Currently demo/placeholder
- **Data Persistence**: No database integration yet
- **Mobile Optimization**: Interface is responsive but may need refinement
- **Production Ready**: Not recommended for live business use yet

---

## 📝 Coming Soon

- [ ] Real database integration
- [ ] User authentication system
- [ ] Multi-location support
- [ ] Advanced ML models
- [ ] Mobile app
- [ ] API integrations (suppliers, payment gateways)
- [ ] Export to Excel/PDF
- [ ] Team collaboration features
- [ ] Custom alerts and notifications
- [ ] Historical data archive

---

## 🤝 Support & Contribution

For issues, suggestions, or contributions, please visit the [GitHub repository](https://github.com/qistina19-commits/Freshies).

---

## 📄 License

This project is currently in BETA. License information to be added.

---

## 👨‍💻 Development Team

Developed for F&B businesses to optimize inventory and reduce waste through AI-powered insights.

**Motto**: *Predict. Prevent. Profit.*

---

**Last Updated**: July 2026  
**Status**: BETA Testing Phase
