const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateToken = (req, res, next) => {
    // 요청 헤더에서 Authorization 헤더를 추출
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token> 형식에서 토큰만 추출

    if (!token) {
        // 토큰이 없는 경우
        return res.status(403).json({ 
            code: 403,
            message: '토큰이 제공되지 않았습니다.' 
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(419).json({
                    code: 419,
                    message: '토큰이 만료되었습니다.',
                });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    code: 401,
                    message: '유효하지 않은 토큰입니다.',
                });
            } else {
                return res.status(400).json({
                    code: 400,
                    message: '토큰 검증 중 오류가 발생했습니다.',
                });
            }
        }

        // 토큰이 유효한 경우, 디코딩된 정보를 req.user에 저장
        req.user = decoded;
        next(); // 다음 미들웨어 또는 라우트 핸들러로 이동
    });
};

module.exports = authenticateToken;
