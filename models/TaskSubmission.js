const { Sequelize } = require('sequelize');

class TaskSubmission extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        task_submission_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        answer: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        audio_file: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        img_file: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        submission_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Submission',
            key: 'submission_id',
          },
        },
        task_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Task',
            key: 'task_id',
          },
        },
        user_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'User',
            key: 'user_id',
          },
        },
        teacher_words: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'TaskSubmission',
        tableName: 'task_submission',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Submission, { foreignKey: 'submission_id', targetKey: 'submission_id' });
    this.belongsTo(models.Task, { foreignKey: 'task_id', targetKey: 'task_id' });
    this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
  }
}

module.exports = TaskSubmission;