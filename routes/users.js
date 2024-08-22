const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

// 회원가입
router.post('/signup', users.signup);

// 이메일 중복 검사
router.get('/check-email', users.checkEmail);

// 로그인
router.post('/login', users.login);

// 이메일 찾기
router.get('/find-email', users.findEmail);

// 비밀번호 찾기 - 이메일 인증코드 요청
router.post('/password-code', users.passwordCode);

// 비밀번호 찾기 - 이메일 인증코드 검증
router.post('/verify-code', users.verifyCode);

module.exports = router;
