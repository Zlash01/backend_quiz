const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'e.g., "student", "admin"',
    },
    class: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    student_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return user;
};
