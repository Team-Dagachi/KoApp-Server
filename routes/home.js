const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const { authenticateToken } = require('../middlewares/jwt');

// 오늘의 어휘 1개 조회
router.get('/today-words/:word_id', authenticateToken, home.getTodayWord);

module.exports = router;
