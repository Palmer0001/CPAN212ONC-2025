import React from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    
    alert("Checkout Successful!");
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <p>Enter your shipping information...</p>
      
      <button onClick={handleCheckout}>Complete Order</button>
    </div>
  );
};

export default Checkout;
