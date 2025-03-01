import React, { useState } from "react";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Book 1",
      price: 15.99,
      quantity: 1,
      rating: 0,
      feedback: "",
    },
    {
      id: 2,
      title: "Book 2",
      price: 10.99,
      quantity: 1,
      rating: 0,
      feedback: "",
    },
  ]);

  const handleQuantityChange = (id, quantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleRatingChange = (id, rating) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, rating } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleFeedbackChange = (id, feedback) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, feedback } : item
    );
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item card">
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="input-quantity"
                />
              </div>
              <div>
                <label>Rating:</label>
                <select
                  value={item.rating}
                  onChange={(e) => handleRatingChange(item.id, e.target.value)}
                  className="input-rating"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} Star{rating > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Feedback:</label>
                <textarea
                  value={item.feedback}
                  onChange={(e) => handleFeedbackChange(item.id, e.target.value)}
                  placeholder="Enter feedback"
                  className="input-feedback"
                />
              </div>
            </div>
          ))}
          <div className="total">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          </div>
          <div className="checkout">
            <Link to="/checkout">
              <button>Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
