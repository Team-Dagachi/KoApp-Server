const {Sequelize} = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        user_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        last_name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        first_name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        user_pwd: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
        language:{
          type: Sequelize.ENUM('VN','CN','KR'),
          allowNull: false,
        },
        user_type:{
          type: Sequelize.ENUM('S','T'),
          allowNull: false,
        },
        score: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        picture_url: {
          type: Sequelize.STRING(255),
          allowNull: true,
      }
    },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = User;