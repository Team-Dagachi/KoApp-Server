const express = require('express');
const router = express.Router();

// 기본 라우트
router.get('/', (req, res) => {
  res.json({ message: 'Hello Koapp' });
});

module.exports = router;
