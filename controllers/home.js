const { TodayWord, LearnedWord } = require('../models');
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

// 오늘의 어휘 획득
exports.addLearnedWord = async (req, res) => {
  try {
      const userId = req.user.user_id;
      const { wordExpression } = req.body;

      // 어휘 표현에 해당하는 단어를 TodayWord에서 찾기
      const word = await TodayWord.findOne({
          where: { wordExpression }
      });

      if (!word) {
          return res.status(404).json({
              status: 404,
              message: '해당 어휘를 찾을 수 없습니다.',
          });
      }

      // 이미 학습한 어휘인지 확인
      const alreadyLearned = await LearnedWord.findOne({
          where: {
              user_id: userId,
              word_id: word.word_id
          }
      });

      if (alreadyLearned) {
          return res.status(400).json({
              status: 400,
              message: '이미 학습한 어휘입니다.',
          });
      }

      // 학습한 어휘로 저장
      await LearnedWord.create({
          user_id: userId,
          word_id: word.word_id
      });

      return res.status(201).json({
          status: 201,
          message: '오늘의 어휘 획득 성공',
      });
  } catch (error) {
      console.error('Error adding learned word:', error);
      return res.status(500).json({
          status: 500,
          message: '서버 에러가 발생했습니다.',
      });
  }
};

// 학습한 어휘 리스트 조회
exports.getLearnedWords = async (req, res) => {
  try {
      const userId = req.user.user_id;
      
      const learnedWords = await LearnedWord.findAll({
          where: {
              user_id: userId
          },
          include: [{
              model: TodayWord,
              attributes: ['grade', 'part', 'wordIcon', 'word', 'wordExpression']
          }]
      });

      // DTO 형태로 응답 데이터 구성
      const learnedWordsDTO = learnedWords.map(learnedWord => ({
          grade: learnedWord.TodayWord.grade,
          part: learnedWord.TodayWord.part,
          wordIcon: learnedWord.TodayWord.wordIcon,
          word: learnedWord.TodayWord.word,
          wordExpression: learnedWord.TodayWord.wordExpression
      }));

      return res.status(200).json({
          status: 200,
          message: '학습한 어휘 리스트 조회 성공',
          data: learnedWordsDTO
      });
  } catch (error) {
      console.error('Error fetching learned words:', error);
      return res.status(500).json({
          status: 500,
          message: '서버 에러가 발생했습니다.',
          data: null
      });
  }
};