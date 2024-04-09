module.exports = (sequelize, DataTypes) => {
  const exam = sequelize.define("exam", {
    exam_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    exam_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_scheduled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    scheduled_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
