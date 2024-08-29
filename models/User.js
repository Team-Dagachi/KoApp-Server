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
        user_type: {
          type: Sequelize.ENUM("S", "T"),
          allowNull: false,
        },
        language: {
          type: Sequelize.ENUM("VN", "CN", "KR"),
          allowNull: true,
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
        phone_num: {
          type: Sequelize.STRING(12),
          allowNull: true,
        },
        score: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        picture_url: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        eucalyptus_score: {
          type: Sequelize.INTEGER,
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
  static associate(models) {
    this.hasMany(models.Program, { foreignKey: 'user_id', sourceKey: 'user_id' }); // 선생님이 생성한 프로그램
    this.hasMany(models.Attendance, { foreignKey: 'user_id', sourceKey: 'user_id' });
    this.hasMany(models.Push, { foreignKey: 'user_id', sourceKey: 'user_id' });
    this.hasMany(models.LearnedWord, { foreignKey: 'user_id', sourceKey: 'user_id' });
    this.hasMany(models.Submission, { foreignKey: 'user_id', sourceKey: 'user_id' });
    this.belongsToMany(models.Program, {
      through: 'StudentProgram',
      foreignKey: 'user_id',
      otherKey: 'program_id',
    });
    this.hasMany(models.TaskSubmission, { foreignKey: 'user_id', sourceKey: 'user_id' });
    this.hasMany(models.Submission, { foreignKey: 'user_id', sourceKey: 'user_id' });
  }
}

module.exports = User;