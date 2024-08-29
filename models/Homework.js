const { Sequelize } = require('sequelize');

class Homework extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        homework_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        homework_name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        start_date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        end_date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        homework_info: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        homework_type: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
        modelName: 'Homework',
        tableName: 'homework',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Program, { foreignKey: 'program_id', targetKey: 'program_id' });
    this.hasMany(models.Task, { foreignKey: 'homework_id', sourceKey: 'homework_id' });
    this.hasMany(models.Submission, { foreignKey: 'homework_id', sourceKey: 'homework_id' });
  }
}

module.exports = Homework;
