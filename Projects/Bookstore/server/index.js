import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import book_router from "./routers/book_router.js";
import user_router from "./routers/user_router.js";
import review_router from "./routers/review_router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/book", book_router);
app.use("/user", user_router);
app.use("/review", review_router);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.error("MongoDB connection error:", error));

app.use((req, res) => {
  res.status(404).send("Page not found");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});