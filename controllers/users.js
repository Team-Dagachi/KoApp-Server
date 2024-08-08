const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// 회원가입 로직
exports.signup = async (req, res) => {
  try {
    const { last_name, first_name, user_pwd, email, language, user_type, picture_url } = req.body;

    // 필수 입력값 확인
    if (!last_name || !first_name || !user_pwd || !email || !language || !user_type) {
      return res.status(400).json({ error: '필수 입력값이 누락되었습니다.' });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(user_pwd, 10);

    // 유저 생성
    const newUser = await User.create({
      last_name,
      first_name,
      user_pwd: hashedPassword,
      email,
      language,
      user_type
    });

    return res.status(201).json({
      message: '회원가입 완료',
      userId: newUser.user_id,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: '회원가입 중 오류가 발생했습니다.' });
  }
};