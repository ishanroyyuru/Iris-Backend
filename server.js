const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Allows frontend to communicate with backend

// API endpoint to return facility hours
app.get('/api/facility/bruin-fit', (req, res) => {
    res.send({data: "Monday-Thursday: 6:00 AM - 1:00 AM Friday: 6:00 AM - 9:00 PM Saturday: 9:00 AM - 6:00 PM Sunday: 9:00 AM - 11:00 PM"});
});

// Catch-all for undefined facilities
app.get('/api/facility/:name', (req, res) => {
    res.status(404).send("Facility not found");
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
