import Review from "../models/review.js";
import Book from "../models/book.js";

const addReview = async (req, res) => {
  try {
    const { bookId, review_text, rating } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const newReview = new Review({
      book: bookId,
      user: req.user.userId,
      review_text,
      rating,
    });

    await newReview.save();
    res.status(201).json({ message: "Review added successfully", newReview });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
};

const getReviews = async (req, res) => {
  try {
    const { bookId } = req.params;

    const reviews = await Review.find({ book: bookId }).populate("user", "email");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

export default {
  addReview,
  getReviews,
};
