const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

//middlewares
const dotenv = require("dotenv");
dotenv.config();

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//routers

const userRouter = require("./routes/userRouter.js");
app.use("/api/users", userRouter);

const examRouter = require("./routes/examRouter.js");
app.use("/api/exams", examRouter);

const questionRouter = require("./routes/questionRouter.js");
app.use("/api/questions", questionRouter);

const answerRouter = require("./routes/answerRouter.js");
app.use("/api/answers", answerRouter);

const studentExamParticipationRouter = require("./routes/studentExamParticipationRouter.js");
app.use("/api/participations", studentExamParticipationRouter);

const studentAnswerRouter = require("./routes/studentAnswersRouter.js");
app.use("/api/student-answers", studentAnswerRouter);

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
