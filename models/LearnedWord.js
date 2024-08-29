const { Sequelize } = require("sequelize");

class LearnedWord extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        user_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "User",
            key: "user_id",
          },
        },
        word_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "TodayWord", 
            key: "word_id",
          },
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "LearnedWord",
        tableName: "learned_word",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", targetKey: "user_id" });
    this.belongsTo(models.TodayWord, { foreignKey: "word_id", targetKey: "word_id" });
  }
}

module.exports = LearnedWord;
