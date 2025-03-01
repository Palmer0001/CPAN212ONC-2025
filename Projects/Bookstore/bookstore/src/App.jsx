import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import AllBooks from './pages/AllBooks';
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetail from './pages/BookDetails';
import EditBook from './pages/EditBook';
import Logout from './pages/Logout';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
const App = () => (
  <Router>
    <div className="app">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
        
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;