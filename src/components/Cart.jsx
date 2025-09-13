function Cart({ cartItems, onRemove, onPay }) {
  const total = cartItems.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="cart">
      <h2>🛒 Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items added</p>
      ) : (
        <ul>
          {cartItems.map((item, idx) => (
            <li key={idx}>
              {item.name} - ₹{item.price}
              <button onClick={() => onRemove(item)}>❌</button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div>
          <h3>Total: ₹{total}</h3>
          <button className="pay-btn" onClick={onPay}>
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
