const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scan.controller');
const multer = require('multer');
const authMiddleware = require('../middlewares/auth.middleware');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/scan', upload.single('file'), authMiddleware, scanController.scanFile);

router.get('/results/:id',authMiddleware, scanController.getScanResults);

module.exports = router;