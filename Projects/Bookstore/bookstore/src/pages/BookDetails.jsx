import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const BookDetail = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); 
  const { id } = useParams();
  useEffect(() => {
    
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      setUserId(decodedToken.userId); 
    }

    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}http://localhost:8000/book/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/books/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (response.ok) {
        alert("Book deleted successfully!");
        navigate("/");; 
      } else {
        alert("Failed to delete the book. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting the book:", error);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Publishers:</strong> {book.publishers.join(", ")}</p>
      <p><strong>Genres:</strong> {book.genres.join(", ")}</p>
      <p><strong>Price:</strong> ${book.price.toFixed(2)}</p>
      <p><strong>Pages:</strong> {book.pages}</p>
      {<p><strong>Description:</strong> {book.description || "No description available."}</p>}

      {isAuthenticated && book.created_by_user === userId && ( 
        <div style={styles.actions}>
          <Link to={`/books/edit/${id}`} style={styles.editBtn}>Edit</Link>
          <button onClick={handleDelete} style={styles.deleteBtn}>Delete</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f4f1ea",
  },
  heading: {
    color: "#6b4a30",
    fontSize: "2rem",
    borderBottom: "2px solid #6b4a30",
    display: "inline-block",
    marginBottom: "20px",
  },
  actions: {
    marginTop: "20px",
  },
  editBtn: {
    padding: "10px 20px",
    backgroundColor: "#c49d68",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    marginRight: "10px",
  },
  deleteBtn: {
    padding: "10px 20px",
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default BookDetail;