const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api/v1/players/:playerTag/verifytoken', async (req, res) => {
  const { playerTag } = req.params;
  const { token } = req.body;

  try {
    const response = await axios.post(
      `https://api.clashofclans.com/v1/players/${encodeURIComponent(playerTag)}/verifytoken`,
      { token },
      {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjE1ZTgyOGI3LWRmNDQtNDIzYy1iMTA1LTBlOTUxY2NhYzFiMSIsImlhdCI6MTc0MjkxNjM1Niwic3ViIjoiZGV2ZWxvcGVyL2MzZDc0M2Q5LWZjODQtMzg1My1hYmZkLWU3NWRmZmU5Zjk5NSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE3OS42MC43Mi4yIl0sInR5cGUiOiJjbGllbnQifV19.vU0FGznOb7w51wY-u2TwTrgv_5DDtUSwsIlPM4Cg2I_JtbXnXwqZ5NFCdpvlPIxej2AyyZe2SNGOc-bR-jS4Xw`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Unknown error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
