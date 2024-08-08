'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

// 모델 불러오기
const User = require("./User");

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 모델을 db 객체에 추가
db.User = User;

// 모델 초기화
User.initiate(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 모델 관계 설정
//User.associate(db);

module.exports = db;
