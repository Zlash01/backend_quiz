const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.user;

// Check access token for general user
const checkAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Read token from cookie
    console.log(token);
    if (!token) {
      res.locals.user = null;
      return res.status(403).send({ message: "No token provided!" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .send({ message: "Invalid token or token format!" });
    }

    const user = await User.findOne({
      where: { id: decoded.id },
    });
    if (!user) {
      res.locals.user = null;
      return res.status(404).send({ message: "User not found!" });
    }

    res.locals.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Unauthorized!", error: err });
  }
};

// Check if the user has the 'student' role
const checkStudent = (req, res, next) => {
  if (res.locals.user.role !== "student") {
    return res.status(403).send({ message: "Require Student Role!" });
  }
  next();
};

// Check if the user has the 'admin' role
const checkAdmin = (req, res, next) => {
  if (res.locals.user.role !== "admin") {
    return res.status(403).send({ message: "Require Admin Role!" });
  }
  next();
};

module.exports = { checkStudent, checkAdmin, checkAccessToken };
