import { useState } from "react";

function Cart({ cartItems, onRemove, onPay }) {
  const [showModal, setShowModal] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [upiPin, setUpiPin] = useState("");
  const total = cartItems.reduce((sum, i) => sum + i.price, 0);

  const handleConfirmPay = () => {
    if (!upiId || !upiPin) {
      alert("⚠️ Please enter UPI ID and PIN!");
      return;
    }
    setShowModal(false);
    onPay(); // call backend
    setUpiId("");
    setUpiPin("");
  };

  return (
    <div className="cart">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">No items added yet.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, idx) => (
            <div key={idx} className="cart-item">
              <span>
                {item.name} - ₹{item.price}
              </span>
              <button className="remove-btn" onClick={() => onRemove(item)}>
                ❌
              </button>
            </div>
          ))}

          <div className="cart-total">
            <h3>Total: ₹{total}</h3>
          </div>

          <button className="pay-btn" onClick={() => setShowModal(true)}>
            Proceed to Pay
          </button>
        </div>
      )}

      {/* 🔥 Payment Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>💳 UPI Payment</h2>

            <label>UPI ID:</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="example@upi"
            />

            <label>Amount:</label>
            <input type="text" value={`₹${total}`} readOnly />

            <label>UPI PIN:</label>
            <input
              type="password"
              value={upiPin}
              onChange={(e) => setUpiPin(e.target.value)}
              placeholder="****"
            />

            <div className="modal-actions">
              <button className="pay-btn" onClick={handleConfirmPay}>
                ✅ Pay Now
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
