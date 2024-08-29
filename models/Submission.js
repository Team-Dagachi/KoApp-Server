const { Sequelize } = require('sequelize');

class Submission extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        submission_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        submission_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        is_graded: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        homework_status: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1, // 1: 제출 전, 2: 숙제 중, 3: 제출 완료, 4: 미제출
        },
        impression: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        teacher_words: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        stamp: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        user_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'User',
            key: 'user_id',
          },
        },
        homework_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Homework',
            key: 'homework_id',
          },
        },
      },
      {
        sequelize,
        modelName: 'Submission',
        tableName: 'submission',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
    this.belongsTo(models.Homework, { foreignKey: 'homework_id', targetKey: 'homework_id' });
    this.hasMany(models.TaskSubmission, { foreignKey: 'submission_id', sourceKey: 'submission_id' });
  }
}

module.exports = Submission;
