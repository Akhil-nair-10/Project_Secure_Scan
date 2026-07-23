const express = require('express');
const cors = require('cors');
const dns =  require('dns');
const scanRoute = require('./routes/scan.routes');
const aiSummaryRoute = require('./routes/aiSummary.routes');
const authRoutes = require('./routes/auth.routes');
const cookieParser = require("cookie-parser");


dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'https://secure-scan-frontend.onrender.com',
  credentials:true
}));

//simply backend testing
app.get('/', (req, res) => {
  res.send('Backend is running');
});


app.use('/api', scanRoute); //api that handles file scanning and fetching scan results
app.use('/api', aiSummaryRoute); //api that handles generating AI summary based on scan results
app.use('/api', authRoutes) //api that handles the auth stuffs 

module.exports = app;