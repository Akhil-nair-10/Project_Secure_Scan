const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scan.controller');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/scan', upload.single('file'), scanController.scanFile);

router.get('/results/:id', scanController.getScanResults);

module.exports = router;