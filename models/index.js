const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./UserModel.js")(sequelize, DataTypes);
db.exam = require("./ExamModel.js")(sequelize, DataTypes);
db.student_exam_participation = require("./StudentExamParticipationModel.js")(
  sequelize,
  DataTypes
);
db.question = require("./QuestionModel.js")(sequelize, DataTypes);
db.answer = require("./AnswersModel.js")(sequelize, DataTypes);
db.student_answer = require("./StudentAnswerModel.js")(sequelize, DataTypes);

db.answer.hasMany(db.student_answer, {
  foreignKey: "answer_id",
  sourceKey: "id",
});
db.student_answer.belongsTo(db.answer, {
  foreignKey: "answer_id",
  targetKey: "id",
});

db.sequelize.sync({ force: false }).then(() => {
  console.log("sync done");
});

module.exports = db;
