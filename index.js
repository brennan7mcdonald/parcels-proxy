import fetch from 'node-fetch'; // if needed

export default async function handler(req, res) {
  const { number } = req.query;

  try {
    const response = await fetch(`https://api.parcelsapp.com/v4/trackings/${number}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer YOUR_API_KEY_HERE',
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
