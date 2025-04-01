import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: [String],
    },
    isbn: {
      type: String,
    },
    publisher: {
      type: String,
    },
    publish_date: {
      type: String,
    },
    number_of_pages: {
      type: Number,
    },
    cover: {
      small: String,
      medium: String,
    },
    created_by_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("books", bookSchema);

export default Book;
