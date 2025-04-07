import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="header">
      <h1 className="logo" onClick={() => navigate("/products")}>
        Sisloc Locadora
      </h1>
      <nav className="nav-links">
        <button onClick={() => navigate("/products")}>Produtos</button>
        <button onClick={() => navigate("/cart")}>Carrinho</button>
        <button className="logout-button" onClick={handleLogout}>Sair</button>
      </nav>
    </header>
  );
};

export default Header;
