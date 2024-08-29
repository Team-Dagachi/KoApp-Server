const { Sequelize } = require('sequelize');

class Program extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        program_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        program_code: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        program_name: {
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
        day_of_week: {
          type: Sequelize.ENUM('월', '화', '수', '목', '금', '토', '일'),
          allowNull: false,
        },
        start_time: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        end_time: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'User',
            key: 'user_id',
          },
        },
      },
      {
        sequelize,
        modelName: 'Program',
        tableName: 'programs',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
    this.belongsToMany(models.User, {
      through: 'StudentProgram',
      foreignKey: 'program_id',
      otherKey: 'user_id',
    });
    this.hasMany(models.Todo, { foreignKey: 'program_id', sourceKey: 'program_id' });
    this.hasMany(models.Lesson, { foreignKey: 'program_id', sourceKey: 'program_id' });
  }
}

module.exports = Program;
