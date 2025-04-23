import fetch from 'node-fetch'; // if needed

export default async function handler(req, res) {
  const { number } = req.query;

  try {
    const response = await fetch(`https://api.parcelsapp.com/v4/trackings/${number}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJkMWIzZTk1MC0xZjU3LTExZjAtOWNlYi0xNTI0OWNmMWIyM2UiLCJzdWJJZCI6IjY4MDc1OWY4ZmRjMDI1MmM1ZDgxYTY1YiIsImlhdCI6MTc0NTMxMjI0OH0.lSchPp4y7n3rMaAkCTGfm2d9rdAIsEaEe7IQVufFrRk',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
}
