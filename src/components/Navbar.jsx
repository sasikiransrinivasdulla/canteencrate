import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo} alt="canteen logo" className="logo" />
      <h1>Smart Canteen (PrePay)</h1>
    </nav>
  );
}

export default Navbar;
