const express = require("express");
const dotenv = require("dotenv");
const labRouter = require("./Router/lab_router");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/lab", labRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the lab router! - GET");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
