module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define("question", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    exam_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "exams",
        key: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    question_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return question;
};
