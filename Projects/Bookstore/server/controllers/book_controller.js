import axios from "axios";
import Book from "../models/book.js";

const fetchAndStoreBooks = async (req, res) => {
  try {
    const { query } = req.body;
    const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
    if (response.data.docs.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    const booksToInsert = response.data.docs.slice(0, 10).map((book) => ({
      title: book.title,
      authors: book.author_name || ["Unknown"],
      isbn: book.isbn ? book.isbn[0] : "N/A",
      publisher: book.publisher ? book.publisher[0] : "Unknown",
      publish_date: book.first_publish_year || "Unknown",
      number_of_pages: book.number_of_pages_median || 0,
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
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

const getUserBooks = async (req, res) => {
  try {
    const books = await Book.find({ created_by_user: req.user.userId });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, authors, publishers, genres, price, pages } = req.body;
    const newBook = new Book({
      title,
      authors,
      publishers,
      genres,
      price,
      pages,
      created_by_user: req.user.userId,
      created_at: new Date(),
      updated_at: new Date(),
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: "Error adding book", error });
  }
};

const editBook = async (req, res) => {
  try {
    const { title, authors, publishers, genres, price, pages } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, authors, publishers, genres, price, pages, updated_at: new Date() },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: "Error updating book", error });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.created_by_user.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this book" });
    }
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};

const getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book details", error });
  }
};

export default {
  fetchAndStoreBooks,
  getAllBooks,
  getUserBooks,
  addBook,
  editBook,
  deleteBook,
  getBookDetails,
};
