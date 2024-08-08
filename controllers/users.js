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
      return res.status(400).json({ message: '필수 입력값이 누락되었습니다.' });
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

// 이메일 중복 검사 로직
exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.query;

    // 이메일 입력 확인
    if (!email) {
      return res.status(400).json({ message: '이메일을 입력해주세요.' });
    }

    // 데이터베이스에서 이메일 중복 여부 확인
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      // 이메일이 이미 존재하는 경우
      return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
    }

    // 이메일이 존재하지 않는 경우
    return res.status(200).json({ message: '사용 가능한 이메일입니다.' });
  } catch (error) {
    console.error('Error checking email:', error);
    return res.status(500).json({ message: '이메일 확인 중 오류가 발생했습니다.' });
  }
};

//로그인
exports.login = async (req, res) => {
  const { email, user_pwd } = req.body;

  try {
    // 아이디 확인
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: '잘못된 아이디입니다.' });
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(user_pwd, user.user_pwd);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '잘못된 비밀번호입니다.' });
    }

    // JWT 토큰 발급
    const token = jwt.sign(
      { user_id: user.user_id }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ message: '로그인 성공', token });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ message: '로그인 중 서버 오류가 발생했습니다.' });
  }
};
