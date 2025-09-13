import { useEffect, useState } from "react";

function OwnerPortal() {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch all orders from backend
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

  // ✅ Mark order as Printed
  const markAsPrinted = async (id) => {
    try {
      const res = await fetch(
        `https://canteen-backend-user.onrender.com/api/orders/${id}/print`,
        { method: "PUT" }
      );
      const updated = await res.json();
      setOrders((prev) =>
        prev.map((o) => (o._id === updated._id ? updated : o))
      );
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  return (
    <div className="orders-section">
      <h2>📋 Owner Dashboard - Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
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
                <td>
                  {order.status === "Paid" ? (
                    <button onClick={() => markAsPrinted(order._id)}>
                      Mark as Printed
                    </button>
                  ) : (
                    "✅ Printed"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OwnerPortal;
