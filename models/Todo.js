const { Sequelize } = require('sequelize');

class Todo extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        todo_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        todo_title: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        end_date: {
          type: Sequelize.DATE,
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
        modelName: 'Todo',
        tableName: 'todos',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Program, { foreignKey: 'program_id', targetKey: 'program_id' });
  }
}

module.exports = Todo;
