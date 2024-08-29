const { Sequelize } = require('sequelize');

class StudentProgram extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        user_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'User',
            key: 'user_id',
          },
        },
        program_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'Program',
            key: 'program_id',
          },
        },
      },
      {
        sequelize,
        modelName: 'StudentProgram',
        tableName: 'student_program',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
    this.belongsTo(models.Program, { foreignKey: 'program_id', targetKey: 'program_id' });
  }
}

module.exports = StudentProgram;
