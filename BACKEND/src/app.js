const express = require('express');
const cors = require('cors');
const scanRoute = require('./routes/scan.routes');
const aiSummaryRoute = require('./routes/aiSummary.routes');

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'https://secure-scan-frontend.onrender.com/api'
}));

//simply backend testing
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use('/api', scanRoute); //api that handles file scanning and fetching scan results

app.use('/api', aiSummaryRoute); //api that handles generating AI summary based on scan results

module.exports = app;