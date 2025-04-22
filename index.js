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
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJkMWIzZTk1MC0xZjU3LTExZjAtOWNlYi0xNTI0OWNmMWIyM2UiLCJzdWJJZCI6IjY4MDc1OWY4ZmRjMDI1MmM1ZDgxYTY1YiIsImlhdCI6MTc0NTMxMjI0OH0.lSchPp4y7n3rMaAkCTGfm2d9rdAIsEaEe7IQVufFrRk'
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
