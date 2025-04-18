import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    publishers: "",
    genres: "",
    price: "",
    pages: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You must be logged in to add a book.");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/book/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  
        },
        body: JSON.stringify({
          title: formData.title,
          authors: formData.authors.split(",").map(a => a.trim()),
          publishers: formData.publishers.split(",").map(p => p.trim()),
          genres: formData.genres.split(",").map(g => g.trim()),
          price: parseFloat(formData.price),
          pages: parseInt(formData.pages),
          description: formData.description,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Book added successfully!");
        setFormData({
          title: "",
          authors: "",
          publishers: "",
          genres: "",
          price: "",
          pages: "",
          description: "",
        });
        navigate("/");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="add-book">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="authors"
          placeholder="Authors (comma separated)"
          value={formData.authors}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="publishers"
          placeholder="Publishers (comma separated)"
          value={formData.publishers}
          onChange={handleChange}
        />
        <input
          type="text"
          name="genres"
          placeholder="Genres (comma separated)"
          value={formData.genres}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          step="0.01"
          min="0"
        />
        <input
          type="number"
          name="pages"
          placeholder="Pages"
          value={formData.pages}
          onChange={handleChange}
          required
          min="1"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
