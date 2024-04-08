module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("question", {
    question_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    exam_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correct_option: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Question;
};
