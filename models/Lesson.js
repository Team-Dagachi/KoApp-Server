const { Sequelize } = require('sequelize');

class Lesson extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        lesson_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        lesson_date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        start_time: {
          type: Sequelize.TIME,
          allowNull: true,
        },
        end_time: {
          type: Sequelize.TIME,
          allowNull: true,
        },
        progress: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        notice: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        program_id: {
          type: Sequelize.STRING(20),
          allowNull: false,
          references: {
            model: 'Program',
            key: 'program_id',
          },
        },
      },
      {
        sequelize,
        modelName: 'Lesson',
        tableName: 'lessons',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Program, { foreignKey: 'program_id', targetKey: 'program_id' });
  }
}

module.exports = Lesson;
