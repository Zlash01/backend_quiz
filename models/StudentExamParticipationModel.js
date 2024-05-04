module.exports = (sequelize, DataTypes) => {
  const student_exam_participation = sequelize.define(
    "student_exam_participation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      },
      exam_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "exams",
          key: "id",
        },
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      total_questions: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      correct_answers: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    }
  );
  return student_exam_participation;
};
