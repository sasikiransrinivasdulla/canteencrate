import { useState } from "react";
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

  const addToCart = (item) => setCart([...cart, item]);
  const removeFromCart = (item) => setCart(cart.filter((i) => i !== item));

  const handlePay = () => {
    const newOrder = {
      id: orders.length + 1,
      items: cart.map((i) => i.name),
      total: cart.reduce((sum, i) => sum + i.price, 0),
      status: "Paid",
      date: new Date().toLocaleString(),
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    alert("✅ Payment Successful! Your order has been placed.");
  };

  return (
    <div>
      <Navbar />
      <h2 className="title">Canteen Menu</h2>
      <div className="menu">
        {menuItems.map((item, idx) => (
          <MenuCard key={idx} item={item} onAddToCart={addToCart} />
        ))}
      </div>
      <Cart cartItems={cart} onRemove={removeFromCart} onPay={handlePay} />

      {/* Past Orders Section */}
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
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.items.join(", ")}</td>
                  <td>₹{order.total}</td>
                  <td>{order.status}</td>
                  <td>{order.date}</td>
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
