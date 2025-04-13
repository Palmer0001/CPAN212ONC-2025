import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import recipe_router from "./routers/recipes_router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/recipes", recipe_router);

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
