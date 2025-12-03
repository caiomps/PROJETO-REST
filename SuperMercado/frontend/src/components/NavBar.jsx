import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">Supermercado Admin</span>
        <Link to="/products">Produtos</Link>
        <Link to="/promotions">Promoções</Link>
        <Link to="/users">Usuários</Link>
      </div>

      <button className="btn" onClick={logout}>Sair</button>
    </nav>
  );
}
