const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); 

dotenv.config();

const createToken = (user) => {
  return jwt.sign(
    { user_id: user.user_id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// 회원가입
exports.signup = async (req, res) => {
  try {
    const { user_type, language, last_name, first_name, user_pwd, confirmPwd, email, phone_num } = req.body;

    if (!last_name || !first_name || !user_pwd || !confirmPwd || !email) {
      return res.status(400).json({ message: '필수 입력값이 누락되었습니다.' });
    }
    if (user_pwd.length > 20) {
      return res.status(400).json({ message: '비밀번호는 20자까지 입력 가능합니다.' });
    }

    if (user_pwd.length < 8) {
      return res.status(400).json({ message: '비밀번호는 8자 이상 입력해야 합니다.' });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.!@#$%])[A-Za-z\d.!@#$%]{8,20}$/;
    if (!passwordRegex.test(user_pwd)) {
      return res.status(400).json({ message: '영문, 숫자, 특수문자를 포함해야 합니다.' });
    }

    if (user_pwd !== confirmPwd) {
      return res.status(400).json({ message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
    }

    // 유저 생성
    const newUser = await User.create({
      user_type,
      language,
      last_name,
      first_name,
      user_pwd,
      email,
      phone_num
    });

    const token = createToken(newUser);

    return res.status(201).json({
      message: '회원가입 완료',
      userId: newUser.user_id,
      token: token
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: '회원가입 중 오류가 발생했습니다.' });
  }
};

// 이메일 중복 검사
exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.query;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: '입력된 이메일이 올바르지 않아요.' });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: '이미 가입된 이메일입니다.' });
    }
    return res.status(200).json({ message: '사용 가능한 이메일입니다.' });
  } catch (error) {
    console.error('Error checking email:', error);
    return res.status(500).json({ message: '이메일 확인 중 오류가 발생했습니다.' });
  }
};

// 로그인
exports.login = async (req, res) => {
  const { email, user_pwd } = req.body;

  try {
    // 아이디와 비밀번호 필수 입력값 확인
    if (!email || !user_pwd) {
      return res.status(400).json({ message: '아이디와 비밀번호를 입력하세요.' });
    }

    // 아이디 확인
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: '이메일이 존재하지 않습니다.' });
    } 

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(user_pwd, user.user_pwd);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '잘못된 비밀번호입니다.' });
    }

    const token = createToken(user);
    
    res.json({ message: '로그인 성공', token });
  } catch (error) {
    console.error('login error', error);
    res.status(500).json({ message: '로그인 중 서버 오류가 발생했습니다.' });
  }
};

// 이메일 찾기
exports.findEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: '이메일을 입력하세요.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: '미가입된 이메일입니다.' });
    }

    return res.status(200).json({ 
      message: '회원가입된 이메일입니다.',
      email: user.email 
    });
  } catch (error) {
    console.error('Error finding email:', error);
    return res.status(500).json({ message: '이메일 찾기 중 오류가 발생했습니다.' });
  }
};

// 이메일 전송을 위한 Nodemailer 설정
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  }
});

// 비밀번호 찾기 - 이메일 인증코드 요청
exports.passwordCode = async (req, res) => {
  try {
    const { email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: '입력된 이메일이 올바르지 않아요.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: '미가입된 이메일입니다.' });
    }

    // 5자리 랜덤 인증코드 생성
    const verificationCode = crypto.randomInt(10000, 99999).toString();

    const token = jwt.sign({ verificationCode }, process.env.JWT_SECRET, { expiresIn: '5m' });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'KOAPP 인증 코드 요청',
      text: `KOAPP 인증코드는 ${verificationCode}입니다. 이 코드는 5분 동안 유효합니다.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: '인증코드 전송에 실패했습니다.' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ 
          message: '이메일로 인증 코드를 전송했습니다.',
          token
        });
      }
    });

  } catch (error) {
    console.error('Error processing verification request:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

// 비밀번호 찾기 - 이메일 인증 코드 검증
exports.verifyCode = (req, res) => {
  try {
    const { verificationCode, token } = req.body;

    if (!verificationCode || !token) {
      return res.status(400).json({ message: '필수 입력값이 누락되었습니다.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.verificationCode === verificationCode) {
      return res.status(200).json({ message: '인증에 성공했습니다.' });
    } else {
      return res.status(400).json({ message: '인증코드가 일치하지 않습니다.' });
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: '다시 인증을 요청해주세요.' });
    } else {
      return res.status(400).json({ message: '유효하지 않은 요청입니다.' });
    }
  }
};