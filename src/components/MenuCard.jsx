function MenuCard({ item, onAddToCart }) {
  return (
    <div className="menu-card">
      <img src={item.image} alt={item.name} className="menu-img" />
      <h3>{item.name}</h3>
      <p>₹{item.price}</p>
      <button onClick={() => onAddToCart(item)}>Add to Cart</button>
    </div>
  );
}

export default MenuCard;
