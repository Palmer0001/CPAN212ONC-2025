import express from "express";
import fs from "fs";
import path from "path";
import _ from "lodash";
import fetch from "node-fetch";

const router = express.Router();
const upload_directory = path.join(process.cwd(), "uploads");

router.get("/all", (req, res) => {
  let files_array = fs.readdirSync(upload_directory);
  res.json(files_array.map(file => `/fetch/file/${file}`));
});

router.get("/multiple", (req, res) => {
  let files_array = fs.readdirSync(upload_directory);
  if (files_array.length === 0) {
    return res.status(503).json({ message: "No images available" });
  }

  let randomFiles = _.sampleSize(files_array, Math.min(3, files_array.length));
  res.json(randomFiles.map(file => `/fetch/file/${file}`));
});

router.get("/random", (req, res) => {
  let files_array = fs.readdirSync(upload_directory);
  if (files_array.length === 0) {
    return res.status(503).json({ message: "No images available" });
  }

  let randomFile = _.sample(files_array);
  res.json({ imageUrl: `/fetch/file/${randomFile}` });
});

router.get("/dog", async (req, res) => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    res.json({ imageUrl: data.message });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dog image" });
  }
});

router.get("/file/:filename", (req, res) => {
  const filePath = path.join(upload_directory, req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

export default router;