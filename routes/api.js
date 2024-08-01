const express = require('express');
const router = express.Router();

// 예제 API 라우트
router.get('/data', (req, res) => {
  // 예제 데이터
  const data = {
    id: 1,
    name: 'Sample Data',
  };
  res.json(data); // JSON 응답
});

module.exports = router;