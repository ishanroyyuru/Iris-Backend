const express = require('express');
const app = express();

app.use(cors());

app.get('/api/facility/bruin-fit', (req, res) => {
    console.log("API request received");  // Debug log

    // Send the response as JSON
    res.json({ 
        data: "Monday-Thursday: 6:00 AM - 1:00 AM Friday: 6:00 AM - 9:00 PM Saturday: 9:00 AM - 6:00 PM Sunday: 9:00 AM - 11:00 PM"
    });
    console.log("API response sent");  // Debug log
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
