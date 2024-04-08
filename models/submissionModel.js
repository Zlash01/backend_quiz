module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define("submission", {
    submission_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exam_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    submited_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Submission;
};
