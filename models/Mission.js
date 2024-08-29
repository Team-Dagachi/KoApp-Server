const { Sequelize } = require('sequelize');

class Mission extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        mission_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        mission_type: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        mission_name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        is_completed: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        mission_date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        mission_progress: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        word_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'TodayWord',
            key: 'word_id',
          },
        },
      },
      {
        sequelize,
        modelName: 'Mission',
        tableName: 'mission',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.TodayWord, { foreignKey: 'word_id', targetKey: 'word_id' });
  }
}

module.exports = Mission;
