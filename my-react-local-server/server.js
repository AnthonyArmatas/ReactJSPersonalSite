// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

 const jsonFilePath = path.join(__dirname, 'data', 'data.json');
 const imagesPath = path.join(__dirname, 'images');  // Define the imagesPath

 // Define the imagesPath as a static directory so that it can be accessed by the browser
app.use(express.static(path.join(__dirname)));


console.log("This is __dirname. " + __dirname );
console.log("This is path.join(__dirname, 'my-react-local-server', 'images'). " + path.join(__dirname, 'my-react-local-server', 'images') );
console.log("This is imagesPath. " + imagesPath );


// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: imagesPath,
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// API endpoint for saving an image
app.post('/api/save-image', upload.single('image'), async (req, res) => {
  try {
    const { file } = req;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    res.json({ success: true, message: 'Image saved successfully', filename: file.originalname });
  } catch (error) {
    console.error('Error saving image:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint for adding a new entry to the JSON file
app.post('/api/add-entry', async (req, res) => {
  try {
    const { text, link, image } = req.body;
    console.log("This is req.body. " + req.body);
    console.log("This is image. " + image);
    console.log("This is text. " + req.body);
    console.log("This is link. " + link);

    const data = await readData();
    const nextId = await getNextId();
    console.log("This the Next ID. " + nextId);
    const newItem = { id: nextId, ...req.body }; // Assuming the request body contains the item details
    data.push(newItem);
    await writeData(data);
    res.json(newItem);

  } catch (error) {
    console.error('Error adding new entry:', error.message);
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


// Function to write data to the JSON file
const writeData = async (data) => {
  try {
    await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing data:', error);
  }
};


// Function to read data from the JSON file
const readData = async () => {
  try {
    const data = await fs.readFile(jsonFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
};

// Route to get the next available ID
app.get('/nextId', async (req, res) => {
  const data = await readData();
  const nextId = Math.max(...data.map(item => item.id), 0) + 1;
  res.json({ nextId });
});


// Helper function to get the next available ID using Axios
const getNextId = async () => {
  try {
    const response = await axios.get('http://localhost:3001/nextId');
    return response.data.nextId;
  } catch (error) {
    console.error('Error getting next ID:', error);
    throw error;
  }
};


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
