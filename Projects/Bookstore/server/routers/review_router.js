import express from "express";
import Review from "../models/review.js";
import auth from "../middlewares/auth.js";

const router = express.Router();


router.post("/add", auth.verifyToken, async (req, res) => {
  const { bookId, review_text, rating } = req.body;

  try {
    const newReview = new Review({
      book: bookId,
      user: req.user.userId,
      review_text,
      rating,
    });

    await newReview.save();

    res.status(201).json({
      message: "Review added successfully",
      newReview,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Error adding review", error });
  }
});

export default router;
