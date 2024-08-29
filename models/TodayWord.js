const { Sequelize } = require('sequelize');

class TodayWord extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        word_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        grade: {
          type: Sequelize.ENUM('초급', '중급', '고급'),
          allowNull: false,
        },
        part: {
          type: Sequelize.ENUM('명사', '동사', '형용사'),
          allowNull: false,
        },
        wordIcon: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        word: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        wordExpression: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'TodayWord',
        tableName: 'today_word',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.LearnedWord, { foreignKey: 'word_id', sourceKey: 'word_id' });
  }
}

module.exports = TodayWord;
