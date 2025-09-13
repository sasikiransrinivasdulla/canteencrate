import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrderTable from "../components/OrderTable";

function OwnerPortal() {
  const [orders, setOrders] = useState([
    { id: 1, items: ["Veg Puff", "Cold Coffee"], total: 60, status: "Pending" },
    { id: 2, items: ["Chicken Roll"], total: 50, status: "Ready" },
  ]);

  const markReady = (id) =>
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "Ready" } : order
      )
    );

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: "center" }}>Orders Dashboard</h2>
      <OrderTable orders={orders} onMarkReady={markReady} />
      <Footer />
    </div>
  );
}

export default OwnerPortal;
