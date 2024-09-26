const express = require('express');
const path = require('path');
const db = require('./database');
const basicAuth = require('express-basic-auth');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Basic authentication for admin routes
const adminAuth = basicAuth({
    users: { 'admin': 'secretpassword' }, // Change this to a secure password
    challenge: true,
    realm: 'Admin Area',
});

// Routes
app.post('/api/messages', (req, res) => {
  const { name, email, message } = req.body;
  db.run(`INSERT INTO messages (name, email, message) VALUES (?, ?, ?)`, [name, email, message], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// Secure the admin routes
app.get('/admin', adminAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/api/messages', adminAuth, (req, res) => {
  db.all(`SELECT * FROM messages ORDER BY timestamp DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});