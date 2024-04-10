const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

//middlewares
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//routers
const userRouter = require("./routes/userRouter.js");
app.use("/api/user", userRouter);

const adminRouter = require("./routes/adminRouter.js");
app.use("/api/admin", adminRouter);

const authRouter = require("./routes/authRouter.js");
app.use("/api/auth", authRouter);

const questionRouter = require("./routes/questionRouter.js");
app.use("/api/question", questionRouter);

//test api
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Quiz WebApp" });
});

//port
const PORT = process.env.PORT || 8080;

//server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
