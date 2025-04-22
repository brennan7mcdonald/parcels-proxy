import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/track', async (req, res) => {
  const number = req.query.number;

  if (!number) return res.status(400).json({ error: 'Missing tracking number' });

  try {
    const response = await fetch(`https://api.parcelsapp.com/v4/trackings/${number}`, {
      headers: {
        Authorization: 'Bearer YOUR_API_KEY_HERE',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
