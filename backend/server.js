const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;   // Render gives you the port via env var

app.use(cors());
app.use(express.json());

let messages = [];

// Correct routes — NO full URL here!!!
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const { author, content } = req.body;
  if (!author || !content) {
    return res.status(400).json({ error: 'Missing author or content' });
  }
  const newMessage = {
    author,
    content,
    timestamp: new Date().toISOString()
  };
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});