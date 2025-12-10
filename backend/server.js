const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Parse JSON bodies

let messages = [];  // In-memory storage

// GET /api/messages - Return all messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// POST /api/messages - Add a new message
app.post('/api/messages', (req, res) => {
  const { author, content } = req.body;
  if (!author || !content) {
    return res.status(400).json({ error: 'Missing author or content' });
  }
  const timestamp = new Date().toISOString();
  const newMessage = { author, content, timestamp };
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});