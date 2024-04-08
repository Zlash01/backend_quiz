import express from "express";
import {
  getUser,
  getUsers,
  handleLoginRequest,
  handleRegisterRequest,
} from "./database.js";

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  res.send(user);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  await handleLoginRequest(username, password);
  res.send("Login request handled");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  await handleRegisterRequest(username, password);
  res.send("Register request handled");
});
