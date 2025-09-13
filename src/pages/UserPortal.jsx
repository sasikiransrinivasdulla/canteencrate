import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MenuCard from "../components/MenuCard";
import Cart from "../components/Cart";
import Footer from "../components/Footer";

import cake from "../assets/cake.jpg";
import icecream from "../assets/icecream.jpg";
import puff from "../assets/puff.jpg";
import burger from "../assets/burger.jpg";
import pizza from "../assets/pizza.jpg";
import fries from "../assets/fries.jpg";
import softdrink from "../assets/softdrink.jpg";
import biscuits from "../assets/biscuits.jpg";
import chocolates from "../assets/chocolates.jpg";
import chips from "../assets/chips.jpg";

function UserPortal() {
  const menuItems = [
    { name: "Cake", price: 80, image: cake },
    { name: "Ice Cream", price: 60, image: icecream },
    { name: "Puff", price: 20, image: puff },
    { name: "Burger", price: 70, image: burger },
    { name: "Pizza", price: 120, image: pizza },
    { name: "Fries", price: 50, image: fries },
    { name: "Soft Drink", price: 30, image: softdrink },
    { name: "Biscuits", price: 25, image: biscuits },
    { name: "Chocolates", price: 40, image: chocolates },
    { name: "Potato Chips", price: 35, image: chips },
  ];

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [upiPin, setUpiPin] = useState("");

  // ✅ Fetch past orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "https://canteen-backend-user.onrender.com/api/orders"
        );
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  const addToCart = (item) => setCart([...cart, item]);
  const removeFromCart = (item) => setCart(cart.filter((i) => i !== item));

  // ✅ Fake payment flow
  const confirmPayment = async () => {
    if (!upiId || !upiPin) {
      alert("⚠️ Please enter UPI ID and PIN");
      return;
    }

    try {
      const response = await fetch(
        "https://canteen-backend-user.onrender.com/api/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart.map((i) => i.name),
            total: cart.reduce((sum, i) => sum + i.price, 0),
          }),
        }
      );

      const newOrder = await response.json();
      setOrders([newOrder, ...orders]);
      setCart([]);

      setShowPayment(false);
      setUpiId("");
      setUpiPin("");

      alert("✅ Payment Successful! Your order has been placed.");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("❌ Something went wrong!");
    }
  };

  // 🔍 Filter menu by search
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      {/* Show available items count */}
      <div className="available-items">Available Items: {menuItems.length}</div>
      <h2 className="title">Canteen Menu</h2>

      {/* 🔍 Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Menu */}
      <div className="menu">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, idx) => (
            <MenuCard key={idx} item={item} onAddToCart={addToCart} />
          ))
        ) : (
          <p className="no-items">No items found</p>
        )}
      </div>

      {/* Cart */}
      <Cart
        cartItems={cart}
        onRemove={removeFromCart}
        onPay={() => setShowPayment(true)}
      />

      {/* Fake Payment Modal */}
      {showPayment && (
        <div className="payment-modal">
          <div className="payment-box">
            <h3>💳 UPI Payment</h3>
            <p>Total: ₹{cart.reduce((sum, i) => sum + i.price, 0)}</p>
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter UPI PIN"
              value={upiPin}
              onChange={(e) => setUpiPin(e.target.value)}
            />
            <button onClick={confirmPayment}>Confirm Payment</button>
            <button
              className="cancel-btn"
              onClick={() => setShowPayment(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Past Orders */}
      <div className="orders-section">
        <h2>📜 Past Orders</h2>
        {orders.length === 0 ? (
          <p>No past orders</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.items.join(", ")}</td>
                  <td>₹{order.total}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default UserPortal;
