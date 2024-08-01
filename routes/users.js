const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 회원가입
router.post('/signup', userController.signup);

// 이메일 중복 검사
router.get('/check-email', userController.checkEmail);

module.exports = router;
