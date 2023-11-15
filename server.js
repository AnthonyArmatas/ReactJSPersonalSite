// server.js
const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Sample endpoint
app.get('/api/links/:linkId', (req, res) => {
  const linkId = req.params.linkId;
  // You can replace this with actual data retrieval logic
  const link = {
    id: linkId,
    title: `Link ${linkId}`,
    url: `https://example.com/link${linkId}`,
  };
  res.json(link);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
