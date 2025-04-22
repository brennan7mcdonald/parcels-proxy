const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/track', async (req, res) => {
  const trackingNumber = req.query.number;

  if (!trackingNumber) {
    return res.status(400).json({ error: 'Missing tracking number' });
  }

  try {
    const response = await fetch(`https://api.parcelsapp.com/v4/trackings/${trackingNumber}`, {
      headers: {
        Authorization: 'Bearer YOUR_API_KEY_HERE'
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tracking info' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
