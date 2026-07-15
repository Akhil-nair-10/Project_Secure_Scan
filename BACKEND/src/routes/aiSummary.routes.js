const express = require('express');
const router = express.Router();
const aiSummaryController = require('../controllers/aiSummary.controller');

router.post('/ai-summary', aiSummaryController.generateAISummary);

module.exports = router;