import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;
const saltRounds = 10;
const SECRET_KEY = "ae2jg244";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "journal-auth",
  password: "12345678",
  port: 5432,
});

db.connect();

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log(`Received username: ${username}, password: ${password}`);
  try {
    const result = await db.query(
      "INSERT INTO auth (username, password) VALUES ($1, $2) RETURNING *",
      [username, hash]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(`Received username: ${username}, password: ${password}`);
  try {
    const result = await db.query("SELECT * FROM auth WHERE username = $1", [
      username,
    ]);
    console.log(result.rows[0]);
    const pass = await bcrypt.compare(password, result.rows[0].password);
    if (!pass) {
      alert("Invalid password or username. Please try again!");
      return res.status(400).json("Invalid username or password");
    }
    const token = jwt.sign({ username: result.rows[0].username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    //res.status(200).json({ message: "Login successful", token });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      }) // Ensure the cookie is set correctly
      .cookie("username", result.rows[0].username, {
        secure: false,
        sameSite: "Lax",
      })
      .json("ok");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.get("/profile", (req, res) => {
  res.json(req.cookies);
  const token = req.cookies.token;

  // if (!token) {
  //   return res.status(401).json("Access denied. No token provided.");
  // }

  // try {
  //   const decoded = jwt.verify(token, SECRET_KEY);
  //   req.user = decoded;
  //   res.status(200).json("Access to protected route granted");
  // } catch (error) {
  //   res.status(400).json("Invalid token");
  // }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("username");
  res.status(200).json({ message: "Logged out successfully" });
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
