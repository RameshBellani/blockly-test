const express = require('express');
const cors = require('cors');
const dummyData = require('./dummyData.json');

const app = express();
app.use(cors());

app.get('/api/location', (req, res) => {
    res.json(dummyData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
