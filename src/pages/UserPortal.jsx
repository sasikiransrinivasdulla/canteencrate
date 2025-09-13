import { useState } from "react";
import Navbar from "../components/Navbar";
import MenuCard from "../components/MenuCard";
import Cart from "../components/Cart";

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

  const addToCart = (item) => setCart([...cart, item]);
  const removeFromCart = (item) => setCart(cart.filter((i) => i !== item));

  const handlePay = () => {
    alert("✅ Simulated Razorpay: Payment Successful!");
    // later: call backend → create order → save in MongoDB
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
    </div>
  );
}

export default UserPortal;
