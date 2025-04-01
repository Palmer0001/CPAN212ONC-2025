import express from "express";
import axios from "axios";
import Book from "../models/book.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/fetch-books", auth.verifyToken, async (req, res) => {
  const { query } = req.body;
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
    const booksData = response.data.docs.slice(0, 10);

    const booksToInsert = booksData.map((book) => ({
      title: book.title,
      authors: book.author_name || ["Unknown"],
      isbn: book.isbn ? book.isbn[0] : "N/A",
      publisher: book.publisher ? book.publisher[0] : "Unknown",
      publish_date: book.publish_date ? book.publish_date[0] : "Unknown",
      number_of_pages: book.number_of_pages || 0,
      cover: {
        small: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg` : "",
        medium: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "",
      },
      created_by_user: req.user.userId,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    const insertedBooks = await Book.insertMany(booksToInsert);
    res.status(201).json({
      message: `${insertedBooks.length} books added successfully`,
      books: insertedBooks,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

router.get("/all", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

router.get("/search", async (req, res) => {
  try {
    const filters = {};
    if (req.query.title) filters.title = req.query.title;
    if (req.query.author) filters.author = req.query.author;
    if (req.query.pages) filters.pages = req.query.pages;
    if (req.query.genres) filters.genres = req.query.genres;
    if (req.query.date_created) {
      const dateValue = parseFloat(req.query.date_created);
      const dateRange = req.query.date_range;
      if (dateRange === "lt") filters.year = { $lt: dateValue };
      else if (dateRange === "gt") filters.year = { $gt: dateValue };
      else if (dateRange === "lte") filters.year = { $lte: dateValue };
      else if (dateRange === "gte") filters.year = { $gte: dateValue };
      else filters.year = dateValue;
    }
    const books = await Book.find(filters);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error applying filters", error });
  }
});

router.post("/save", async (req, res) => {
  try {
    const { title, author, pages, genres } = req.body;
    const newBook = new Book({ title, author, pages, genres });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: "Error saving book", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving book", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, author, publishers, pages, release_date, ISBN } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, publishers, pages, release_date, ISBN },
      { new: true, runValidators: true }
    );
    if (!updatedBook) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

export default router;
