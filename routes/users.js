const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

// 회원가입
router.post('/signup', users.signup);

// 이메일 중복 검사
router.get('/check-email', users.checkEmail);

module.exports = router;
