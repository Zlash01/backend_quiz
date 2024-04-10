module.exports = (sequelize, DataTypes) => {
  const ExamSchedule = sequelize.define("exam_schedule", {
    schedule_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    exam_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  return ExamSchedule;
};
