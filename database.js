import mysql from "mysql2";
import { v4 as uuidv4 } from "uuid";

// Create a connection to the MySQL database
const connection = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "quizz_webapp",
  })
  .promise();

export async function getUsers() {
  const [rows] = await connection.query("SELECT * FROM users");
  return rows;
}

export async function getUser(id) {
  const [rows] = await connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    [id]
  );
  return rows[0];
}

export async function handleLoginRequest(username, password) {
  const [rows] = await connection.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );
  if (rows.length > 0) {
    console.log("Login successful");
    // Perform further actions after successful login
  } else {
    console.log("Invalid username or password");
    // Handle invalid login
  }
}

export async function handleRegisterRequest(username, password) {
  try {
    const [existingUser] = await connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (existingUser.length > 0) {
      console.log("User already exists");
      return;
    }
  } catch (error) {
    console.log("Error occurred while checking for existing user");
    return;
  }
  const id = Math.floor(Math.random() * 10000) + 1;
  //technically need to check for duplicate id sql but for now it's fine

  const [rows] = await connection.query(
    "INSERT INTO users (user_id, username, password) VALUES (?, ? , ?)",
    [id, username, password]
  );
  if (rows.affectedRows > 0) {
    console.log("Registration successful");
    // Perform further actions after successful registration
  } else {
    console.log("Registration failed");
    // Handle registration failure
  }
}
