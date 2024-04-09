module.exports = (sequelize, DataTypes) => {
  const ExamQuestion = sequelize.define("exam_question", {
    exam_question_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    exam_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return ExamQuestion;
};
