// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const jsonFilePath = path.join(__dirname, 'data', 'data.json');

// API endpoint for modifying local JSON file
app.post('/api/modify-json', async (req, res) => {
  try {
    const { data } = req.body;

    // Read the current JSON data from the file
    const currentData = JSON.parse(await fs.readFile(jsonFilePath, 'utf-8'));

    // Modify the data
    // Example: Update the text property of the entry with a specific ID
    const updatedData = currentData.map(entry => {
      if (entry.id === data.id) {
        return { ...entry, text: data.text };
      }
      return entry;
    });

    // Write the modified data back to the file
    await fs.writeFile(jsonFilePath, JSON.stringify(updatedData, null, 2), 'utf-8');

    res.json({ success: true });
  } catch (error) {
    console.error('Error modifying JSON data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint for deleting an entry from local JSON file
app.delete('/api/delete-entry/:id', async (req, res) => {
  try {
    const entryId = parseInt(req.params.id, 10);

    // Read the current JSON data from the file
    const currentData = JSON.parse(await fs.readFile(jsonFilePath, 'utf-8'));

    // Find index of the entry with the given ID
    const index = currentData.findIndex(entry => entry.id === entryId);

    if (index !== -1) {
      // Remove the entry from the array
      currentData.splice(index, 1);

      // Write the modified data back to the file
      await fs.writeFile(jsonFilePath, JSON.stringify(currentData, null, 2), 'utf-8');

      res.json({ success: true, message: 'Entry deleted successfully' });
    } else {
      res.status(404).json({ error: 'Entry not found' });
    }
  } catch (error) {
    console.error('Error deleting entry:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint for deleting local image files
app.delete('/api/delete-image/:imageName', async (req, res) => {
  try {
    const imageName = req.params.imageName;
    const imagePath = path.join(imagesPath, imageName);

    // Delete the image file
    await fs.unlink(imagePath);

    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint for fetching JSON data
app.get('/api/get-json', async (req, res) => {
  try {
    // Read the current JSON data from the file
    const jsonData = JSON.parse(await fs.readFile(jsonFilePath, 'utf-8'));
    res.json({ message: 'JSON data fetched successfully', data: jsonData });
  } catch (error) {
    console.error('Error reading JSON file:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
