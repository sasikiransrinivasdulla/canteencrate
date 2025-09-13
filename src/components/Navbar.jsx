import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo} alt="canteen logo" className="logo" />
      <h1>Smart Canteen (Canteen Crate)</h1>
    </nav>
  );
}

export default Navbar;
