const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data store (replace with database in production)
let reportData = {
  totalRevenue: 124500,
  foodSaved: 450,
  carbonOffset: 82,
  aiAccuracy: 94.2,
  revenueChange: '↑ 5.2%',
  foodChange: '↑ 12 kg today',
  carbonChange: '↑ 2.1 kg today',
  accuracyChange: 'Stable',
  topItems: [
    { name: 'Signature Burger', quantity: 1240 },
    { name: 'Chicken Rice', quantity: 980 },
    { name: 'Fish & Chips', quantity: 756 },
    { name: 'Vegetarian Bowl', quantity: 542 }
  ],
  wastedItems: [
    { name: 'Fresh Salad', quantity: 42 },
    { name: 'White Bread', quantity: 38 },
    { name: 'Grilled Vegetables', quantity: 25 },
    { name: 'Desserts', quantity: 18 }
  ],
  chartData: {
    revenue: [12450, 15320, 14200, 16800, 18900, 19500, 21400, 22300, 24100, 25400, 26800, 28100],
    waste: [420, 385, 410, 375, 350, 320, 310, 290, 280, 265, 250, 220],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
};

// Track connected WebSocket clients
const clients = new Set();

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');
  clients.add(ws);

  // Send initial data to new client
  ws.send(JSON.stringify(reportData));

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// REST API endpoint to get current report data
app.get('/api/reports', (req, res) => {
  res.json(reportData);
});

// REST API endpoint to update metrics (for testing/automation)
app.post('/api/reports/update', (req, res) => {
  const updates = req.body;

  // Update report data
  reportData = { ...reportData, ...updates };

  // Broadcast to all connected WebSocket clients
  broadcastUpdate(reportData);

  res.json({ success: true, data: reportData });
});

// REST API endpoint to update a specific metric
app.post('/api/reports/:metric', (req, res) => {
  const { metric } = req.params;
  const { value } = req.body;

  if (reportData.hasOwnProperty(metric)) {
    reportData[metric] = value;
    broadcastUpdate(reportData);
    res.json({ success: true, [metric]: value });
  } else {
    res.status(400).json({ error: `Unknown metric: ${metric}` });
  }
});

// Broadcast updates to all connected WebSocket clients
function broadcastUpdate(data) {
  const message = JSON.stringify(data);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Simulate live data updates (for demo purposes)
function simulateLiveData() {
  setInterval(() => {
    // Simulate revenue fluctuation
    const revenueVariation = Math.floor(Math.random() * 5000) - 2500;
    reportData.totalRevenue = Math.max(100000, reportData.totalRevenue + revenueVariation);

    // Simulate food saved
    const foodVariation = Math.floor(Math.random() * 30) - 10;
    reportData.foodSaved = Math.max(300, reportData.foodSaved + foodVariation);

    // Simulate carbon offset
    const carbonVariation = (Math.random() * 5 - 2).toFixed(1);
    reportData.carbonOffset = Math.max(50, parseFloat(reportData.carbonOffset) + parseFloat(carbonVariation));

    // Update change indicators
    reportData.revenueChange = revenueVariation > 0 ? `↑ ${(Math.abs(revenueVariation) / 100).toFixed(1)}%` : `↓ ${(Math.abs(revenueVariation) / 100).toFixed(1)}%`;
    reportData.foodChange = foodVariation > 0 ? `↑ ${foodVariation} kg today` : `↓ ${Math.abs(foodVariation)} kg today`;
    reportData.carbonChange = carbonVariation > 0 ? `↑ ${carbonVariation} kg today` : `↓ ${Math.abs(carbonVariation)} kg today`;

    // Slightly vary top items
    if (Math.random() > 0.7) {
      reportData.topItems[Math.floor(Math.random() * reportData.topItems.length)].quantity += Math.floor(Math.random() * 10) - 5;
    }

    // Broadcast updates
    broadcastUpdate(reportData);
  }, 5000); // Update every 5 seconds
}

// Start simulation
simulateLiveData();

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});

module.exports = { app, server, wss, broadcastUpdate };
