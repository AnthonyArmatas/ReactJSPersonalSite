const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/upload', (req, res) => {
  const { image, text } = req.body;

  // Save the image to the public/images directory
  const imagePath = path.join(__dirname, 'public', 'images', `image${Date.now()}.jpg`);
  fs.writeFileSync(imagePath, image, 'base64');

  // Update the data.json file
  const data = require('./src/assets/data.json');
  const newLink = {
    id: data.length + 1,
    image: imagePath.replace(__dirname, ''),
    text,
  };
  data.push(newLink);
  fs.writeFileSync('./src/assets/data.json', JSON.stringify(data, null, 2));

  res.json({ success: true });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
