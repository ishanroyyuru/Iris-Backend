const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
app.use(cors());

async function scrapeProduct(url, xPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$$(xPath);
    if (!el) {
        await browser.close();
        return "Data not found";
    }

    const txt = await el.getProperty('textContent');
    const rawTxt = await txt.jsonValue();

    await browser.close();
    return rawTxt.trim();
}

// Store scraped data in variables
let bFit, jwc, epicuria, deNeve, feast, bPlate, bCafe, cafe1919, rende, study, drey, epicAckerman, rieberTrucks, sproulTrucks;

// **Initialize Scraping Before Starting the Server**
async function initializeData() {
    bFit = await scrapeProduct('https://recreation.ucla.edu/facilities/bfit', 'xpath/.//*[@id="block-ucla-campus-mainpagecontent"]/div[2]/div/div/div/section/section[2]/p[2]');
    jwc = await scrapeProduct('https://recreation.ucla.edu/facilities/jwc', 'xpath/.//*[@id="block-ucla-campus-mainpagecontent"]/div[2]/div/div/div/section/section[2]/p[1]');
    epicuria = await scrapeProduct('https://menu.dining.ucla.edu/hours/', 'xpath/.//*[@id="main-content"]/table/tbody/tr[1]');
    deNeve = await scrapeProduct('https://menu.dining.ucla.edu/hours/', 'xpath/.//*[@id="main-content"]/table/tbody/tr[2]');
    feast = await scrapeProduct('https://menu.dining.ucla.edu/hours/', 'xpath/.//*[@id="main-content"]/table/tbody/tr[3]');
    bPlate = await scrapeProduct('https://menu.dining.ucla.edu/hours/', 'xpath/.//*[@id="main-content"]/table/tbody/tr[4]');
    bCafe = await scrapeProduct('https://menu.dining.ucla.edu/hours/', 'xpath/.//*[@id="main-content"]/table/tbody/tr[5]');
    cafe1919 = await scrapeProduct('https://menu.dining.ucla.edu/hours/', 'xpath/.//*[@id="main-content"]/table/tbody/tr[6]');
    rende = await scrapeProduct('https://menu.dining.ucla.edu/hours/', 'xpath/.//*[@id="main-content"]/table/tbody/tr[7]');
    study = await scrapeProduct('https://menu.dining.ucla.edu/hours/', 'xpath/.//*[@id="main-content"]/table/tbody/tr[8]');
    drey = await scrapeProduct('https://menu.dining.ucla.edu/hours/', 'xpath/.//*[@id="main-content"]/table/tbody/tr[9]');
    epicAckerman = await scrapeProduct('https://menu.dining.ucla.edu/hours/', 'xpath/.//*[@id="main-content"]/table/tbody/tr[10]');
    rieberTrucks = await scrapeProduct('https://menu.dining.ucla.edu/hours/', 'xpath/.//*[@id="main-content"]/table/tbody/tr[11]');
    sproulTrucks = await scrapeProduct('https://menu.dining.ucla.edu/hours/', 'xpath/.//*[@id="main-content"]/table/tbody/tr[12]');

    console.log("Scraping complete.");
}

// **API Endpoints**
app.get('/api/facility/bruin-fit', (req, res) => {
    res.json({ data: bFit || "Data not available yet" });
});

app.get('/api/facility/jwc', (req, res) => {
    res.json({ data: jwc || "Data not available yet" });
});

app.get('/api/dining/epicuria', (req, res) => {
    res.json({ data: epicuria || "Data not available yet" });
});

// **Start the Server After Initializing Data**
const PORT = 5001;
initializeData().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
