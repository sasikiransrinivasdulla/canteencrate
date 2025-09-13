function OrderTable({ orders, onMarkReady }) {
  return (
    <table className="orders">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Items</th>
          <th>Total</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, idx) => (
          <tr key={idx}>
            <td>{order.id}</td>
            <td>{order.items.join(", ")}</td>
            <td>₹{order.total}</td>
            <td>{order.status}</td>
            <td>
              {order.status === "Pending" && (
                <button onClick={() => onMarkReady(order.id)}>
                  Mark Ready
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderTable;
