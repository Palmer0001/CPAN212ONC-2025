import express from "express";
import upload from "../middleware/multer.js"

const router = express.Router();

router.post("/dog", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    message: "Dog image uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
});

export default router;