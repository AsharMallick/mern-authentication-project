const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connect = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
dotenv.config({
  path: "./config/config.env",
});

(async () => await connect())();

app.use(cookieParser());

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/v1/todo/", require("./routes/Todo"));
app.use("/api/v1/auth/", require("./routes/Auth"));

console.log({ state: "Running" });

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("/", (req, res) => {
  res.send(
    "<h1>API WORKS WATCH EXAMPLE GET API <a href='http://127.0.0.1:" +
      process.env.PORT +
      "/api/v1/todo/todos'>HERE</a></h1>"
  );
});


app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
})

module.exports = app;
