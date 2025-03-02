const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors()); // Allows frontend to communicate with backend

app.get('/scrape', async (req, res) => {
    try {
        const { data } = await axios.get('https://example.com'); // Replace with your target site
        const $ = cheerio.load(data);
        const title = $('title').text();  
        res.json({ title });
    } catch (error) {
        res.status(500).json({ error: 'Scraping failed' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));