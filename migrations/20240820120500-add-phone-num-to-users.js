'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'phone_num', {
      type: Sequelize.STRING,
      allowNull: true, // 또는 false, 모델 정의와 일치하도록 설정
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'phone_num');
  }
};
