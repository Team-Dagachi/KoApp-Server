const { Sequelize } = require("sequelize");

class Push extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        push_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        push_enabled: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false, //알림 설정해야지 true로
        },
        user_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: "User", 
            key: "user_id",
          },
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Push",
        tableName: "push",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", targetKey: "user_id" });
  }
}

module.exports = Push;
