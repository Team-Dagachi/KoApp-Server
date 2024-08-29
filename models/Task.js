const { Sequelize } = require('sequelize');

class Task extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        task_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        task_type: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        template: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        question: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        passage: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        audio_file: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        choice: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        task_answer: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        wr_method: {
          type: Sequelize.TEXT,
          allowNull: true,
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
        modelName: 'Task',
        tableName: 'task',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Homework, { foreignKey: 'homework_id', targetKey: 'homework_id' });
    this.hasMany(models.TaskSubmission, { foreignKey: 'task_id', sourceKey: 'task_id' });
  }
}

module.exports = Task;