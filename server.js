const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();

const API_KEY = 'sk-fvxK66aac496124816395';
const TOTAL_PAGES = 337;
const DATA_FILE = 'plantsData.json';
const REQUEST_DELAY = 60000; // 60 seconds delay to avoid hitting the rate limit

async function fetchData() {
  let allData = [];
  let currentPage = 1;

  while (currentPage <= TOTAL_PAGES) {
    try {
      const response = await axios.get(`https://perenual.com/api/species-list?key=${API_KEY}&page=${currentPage}`);
      allData = allData.concat(response.data.data);
      console.log(`Fetched page ${currentPage}`);
      currentPage++;

      // Save progress to a temporary file in case of interruption
      fs.writeFileSync(DATA_FILE, JSON.stringify(allData, null, 2));
      console.log(`Data written to ${DATA_FILE}`);

      // Delay between requests to avoid hitting the rate limit
      await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error(`Rate limit exceeded. Waiting before retrying...`);
        await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
      } else {
        console.error(`Error fetching page ${currentPage}:`, error.message);
        break;
      }
    }
  }

  console.log('Data fetching completed');
}

app.get('/fetch-and-store-data', async (req, res) => {
  await fetchData();
  res.send('Data fetched and stored.');
});

app.get('/get-data', (req, res) => {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE);
    res.json(JSON.parse(data));
  } else {
    res.status(404).send('Data not found.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

