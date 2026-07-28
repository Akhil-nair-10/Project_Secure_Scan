const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.get('/getUser', authMiddleware, authController.getUser);
router.delete('/deleteUser', authMiddleware, authController.deleteUser)

module.exports = router;