import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishers: [],
    genres: [],
    price: "",
    pages: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}http://localhost:8000/book/${id}`
        );
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage("You must be logged in to edit this book.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}book/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: book.title,
            author: book.author,
            publishers: book.publishers,
            pages: book.pages,
            genres: book.genres,
          }),
        }
      );

      if (response.ok) {
        alert("Book updated successfully!");
        navigate(`/books/${id}`);
      } else {
        const result = await response.json();
        setErrorMessage(result.message || "Failed to update the book.");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      setErrorMessage("Error updating book. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Edit Book</h2>
        <label>
          <strong>Title:</strong>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>

        <label>
          <strong>Author:</strong>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>

        <label>
          <strong>Publishers (comma separated):</strong>
          <input
            type="text"
            name="publishers"
            value={book.publishers.join(", ")}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "publishers",
                  value: e.target.value.split(", "),
                },
              })
            }
            required
            style={styles.input}
          />
        </label>

        <label>
          <strong>Genres (comma separated):</strong>
          <input
            type="text"
            name="genres"
            value={book.genres.join(", ")}
            onChange={(e) =>
              handleChange({
                target: { name: "genres", value: e.target.value.split(", ") },
              })
            }
            required
            style={styles.input}
          />
        </label>

        <label>
          <strong>Price:</strong>
          <input
            type="number"
            name="price"
            value={book.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            style={styles.input}
          />
        </label>

        <label>
          <strong>Pages:</strong>
          <input
            type="number"
            name="pages"
            value={book.pages}
            onChange={handleChange}
            required
            min="1"
            style={styles.input}
          />
        </label>

        {
          <label>
            <strong>Description:</strong>
            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              style={styles.textarea}
            />
          </label>
        }

        <button type="submit" style={styles.submitBtn}>
          Update Book
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "30px",
    backgroundColor: "#f4f1ea",
  },
  heading: {
    color: "#6b4a30",
    fontSize: "2rem",
    borderBottom: "2px solid #6b4a30",
    display: "inline-block",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  textarea: {
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    height: "100px",
  },
  submitBtn: {
    padding: "10px 20px",
    backgroundColor: "#c49d68",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default EditBook;
