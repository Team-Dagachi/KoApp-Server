require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { sequelize } = require('./models');

const app = express();

// 포트 설정
app.set('port', process.env.PORT || 3000);

// 데이터베이스 연결
sequelize.sync({ force: false }) 
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error('데이터베이스 연결 실패:', err);
  });

// 미들웨어 설정
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 라우트 설정
const indexRouter = require('./routes/index'); 
const userRouter = require('./routes/users');

// 라우트 연결
app.use('/', indexRouter); 
app.use('/api/users', userRouter);

// 404 에러 처리
app.use((req, res, next) => {
  res.status(404).json({ error: `${req.method} ${req.url} 라우터가 없습니다.` });
});

// 에러 핸들러
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {},
  });
});

// 서버 시작
app.listen(app.get('port'), () => {
  console.log(`${app.get('port')} 번 포트에서 대기 중`);
});