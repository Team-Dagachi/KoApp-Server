const { TodayWord, LearnedWord } = require('../models');
const dotenv = require('dotenv');
const Op = Sequelize.Op;

// 오늘의 어휘 1개 조회
exports.getTodayWord = async (req, res) => {
  try {
      const userId = req.user.user_id;

      const unlearnedWords = await TodayWord.findAll({
          where: {
              word_id: {
                  [Op.notIn]: Sequelize.literal(`(
                      SELECT word_id 
                      FROM learned_word 
                      WHERE user_id = ${userId}
                  )`)
              }
          },
          order: Sequelize.literal('RAND()'),
          limit: 1
      });

      if (unlearnedWords.length > 0) {
          const word = unlearnedWords[0];
          return res.status(200).json({
              status: 200,
              message: '오늘의 어휘 조회 성공',
              data: {
                  grade: word.grade,
                  part: word.part,
                  wordIcon: word.wordIcon,
                  word: word.word,
                  wordExpression: word.wordExpression
              }
          });
      } else {
          return res.status(404).json({
              status: 404,
              message: '어휘를 모두 학습했습니다.'
          });
      }
  } catch (error) {
      console.error('Error fetching unlearned word:', error);
      return res.status(500).json({
          status: 500,
          message: '서버 에러가 발생했습니다.'
      });
  }
};