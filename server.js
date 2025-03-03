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

// Parse scraped string
// Parse scraped string
function getTodaysSchedule(scheduleString) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = daysOfWeek[new Date().getDay()]; // Get today's day name

    // Check if it's a restaurant-style schedule (contains "Menu ∣ Hours")
    if (scheduleString.includes("Menu ∣ Hours")) {
        // Extract all time ranges using regex
        const timeRegex = /(\d{1,2}(:\d{2})?\s?[ap]\.m\.\s-\s\d{1,2}(:\d{2})?\s?[ap]\.m\.)/gi;
        const matches = scheduleString.match(timeRegex);

        return matches && matches.length > 0 ? matches.join(", ") : "Closed for today";
    }

    // Gym-style schedule parsing
    const regex = /(Monday-Thursday|Friday|Saturday|Sunday):\s([\d:AMP -]+)/g;
    let match;
    const schedule = {};

    while ((match = regex.exec(scheduleString)) !== null) {
        let days = match[1]; // "Monday-Thursday" or "Friday" etc.
        let hours = match[2]; // Corresponding time range

        if (days.includes('-')) {
            let [startDay, endDay] = days.split('-'); // E.g., Monday-Thursday -> ["Monday", "Thursday"]
            let startIndex = daysOfWeek.indexOf(startDay);
            let endIndex = daysOfWeek.indexOf(endDay);

            // Assign the same hours to all days in the range
            for (let i = startIndex; i <= endIndex; i++) {
                schedule[daysOfWeek[i]] = hours;
            }
        } else {
            schedule[days] = hours; // Assign hours for single-day entries
        }
    }

    return schedule[today] || "Closed for today"; // Return today's hours
}


// **API Endpoints**
app.get('/api/facility/bruin-fit', (req, res) => {
    const todayHours = getTodaysSchedule(bFit);
    res.json({ data: todayHours });
});

app.get('/api/facility/jwc', (req, res) => {
    const todayHours = getTodaysSchedule(jwc);
    res.json({ data: todayHours });
});

app.get('/api/facility/epicuria', (req, res) => {
    const todayHours = getTodaysSchedule(epicuria);
    res.json({ data: todayHours });
});

app.get('/api/facility/deNeve', (req, res) => {
    const todayHours = getTodaysSchedule(deNeve);
    res.json({ data: todayHours });
});

app.get('/api/facility/feast', (req, res) => {
    const todayHours = getTodaysSchedule(feast);
    res.json({ data: todayHours });
});

app.get('/api/facility/bPlate', (req, res) => {
    const todayHours = getTodaysSchedule(bPlate);
    res.json({ data: todayHours });
});

app.get('/api/facility/bCafe', (req, res) => {
    const todayHours = getTodaysSchedule(bCafe);
    res.json({ data: todayHours });
});

app.get('/api/facility/cafe1919', (req, res) => {
    const todayHours = getTodaysSchedule(cafe1919);
    res.json({ data: todayHours });
});

app.get('/api/facility/rende', (req, res) => {
    const todayHours = getTodaysSchedule(rende);
    res.json({ data: todayHours });
});

app.get('/api/facility/study', (req, res) => {
    const todayHours = getTodaysSchedule(study);
    res.json({ data: todayHours });
});

app.get('/api/facility/drey', (req, res) => {
    const todayHours = getTodaysSchedule(drey);
    res.json({ data: todayHours });
});

app.get('/api/facility/epicAckerman', (req, res) => {
    const todayHours = getTodaysSchedule(epicAckerman);
    res.json({ data: todayHours });
});

app.get('/api/facility/rieberTrucks', (req, res) => {
    const todayHours = getTodaysSchedule(rieberTrucks);
    res.json({ data: todayHours });
});

app.get('/api/facility/sproulTrucks', (req, res) => {
    const todayHours = getTodaysSchedule(sproulTrucks);
    res.json({ data: todayHours });
});

// **Start the Server After Initializing Data**
const PORT = 5001;
initializeData().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
