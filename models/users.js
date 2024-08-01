const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        user_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
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
        language: {
          type: Sequelize.ENUM("VN", "CN", "KR"),
          allowNull: false,
        },
        user_type: {
          type: Sequelize.ENUM("S", "T"),
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
        },
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
        hooks: {
          // 비밀번호를 저장하기 전에 해싱
          beforeCreate: async (user) => {
            if (user.user_pwd) {
              const salt = await bcrypt.genSalt(10);
              user.user_pwd = await bcrypt.hash(user.user_pwd, salt);
            }
          },
          beforeUpdate: async (user) => {
            if (user.user_pwd) {
              const salt = await bcrypt.genSalt(10);
              user.user_pwd = await bcrypt.hash(user.user_pwd, salt);
            }
          },
        },
      }
    );
  }
}

module.exports = User;
