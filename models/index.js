'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

// 모델 불러오기
const User = require('./User');
const Announcement = require('./Announcement');
const Attendance = require('./Attendance');
const Homework = require('./Homework');
const LearnedWord = require('./LearnedWord');
const Lesson = require('./Lesson');
const Mission = require('./Mission');
const Program = require('./Program');
const Push = require('./Push');
const StudentProgram = require('./StudentProgram');
const Submission = require('./Submission');
const Task = require('./Task');
const TaskSubmission = require('./TaskSubmission');
const TodayWord = require('./TodayWord');
const Todo = require('./Todo');

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 모델을 db 객체에 추가
db.User = User;
db.Announcement = Announcement;
db.Attendance = Attendance;
db.Homework = Homework;
db.LearnedWord = LearnedWord;
db.Lesson = Lesson;
db.Mission = Mission;
db.Program = Program;
db.Push = Push;
db.StudentProgram = StudentProgram; 
db.Submission = Submission;
db.Task = Task;
db.TaskSubmission = TaskSubmission;
db.TodayWord = TodayWord;
db.Todo = Todo;

// 모델 초기화
User.initiate(sequelize);
Announcement.initiate(sequelize);
Attendance.initiate(sequelize);
Homework.initiate(sequelize);
LearnedWord.initiate(sequelize);
Lesson.initiate(sequelize);
Mission.initiate(sequelize);
Program.initiate(sequelize);
Push.initiate(sequelize);
StudentProgram.initiate(sequelize);
Submission.initiate(sequelize);
Task.initiate(sequelize);
TaskSubmission.initiate(sequelize);
TodayWord.initiate(sequelize);
Todo.initiate(sequelize);

// 모델 관계 설정
User.associate(db);
Announcement.associate(db);
Attendance.associate(db);
Homework.associate(db);
LearnedWord.associate(db);
Lesson.associate(db);
Mission.associate(db);
Program.associate(db);
Push.associate(db);
StudentProgram.associate(db); 
Submission.associate(db);
Task.associate(db);
TaskSubmission.associate(db);
TodayWord.associate(db);
Todo.associate(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
