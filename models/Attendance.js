const { Sequelize } = require('sequelize');

class Attendance extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        attendance_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'User',
            key: 'user_id',
          },
        },
        attendance_date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        is_present: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: 'Attendance',
        tableName: 'attendances',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
  }
}

module.exports = Attendance;
