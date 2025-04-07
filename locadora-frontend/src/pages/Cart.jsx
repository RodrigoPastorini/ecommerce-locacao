import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";
import { rentalTypeLabel } from '../utils/rentalTypeLabel';
import Header from "../components/Header";



function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    axios
      .get("http://localhost:3000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCartItems(response.data);
        const initialQuantities = {};
        response.data.forEach((item) => {
          const id = item.product_id || item.id;
          initialQuantities[id] = item.quantity;
        });
        setQuantities(initialQuantities);
      })
      .catch((error) => console.error("Erro ao buscar o carrinho", error));
  };

  const handleUpdate = (productId) => {
    const quantity = quantities[productId];

    axios
      .put(
        `http://localhost:3000/api/cart/${productId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("Quantidade atualizada!");
        fetchCart();
      })
      .catch((error) => console.error("Erro ao atualizar item", error));
  };

  const handleRemove = (productId) => {
    axios
      .delete(`http://localhost:3000/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Item removido do carrinho!");
        fetchCart();
      })
      .catch((error) => console.error("Erro ao remover item", error));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + parseFloat(item.total_price), 0).toFixed(2);
  };

  return (
    <div className="container">
                  <Header />
      <h2>Meu Carrinho</h2>

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className="cart-items-row">
          {cartItems.map((item) => {
            const id = item.product_id || item.id;
            return (
              <div key={id} className="cart-item-card">
                <img src={item.image_url} alt={item.name} className="product-image" />
                <h3>{item.name}</h3>
                <p><strong>Tipo de Locação:</strong> {rentalTypeLabel(item.rental_type)}</p>
                <p><strong>Valor unitário:</strong> R$ {(item.total_price / item.quantity).toFixed(2)}</p>

                <input
                  type="number"
                  min="1"
                  value={quantities[id] || 1}
                  onChange={(e) =>
                    setQuantities({ ...quantities, [id]: Number(e.target.value) })
                  }
                />

                <p><strong>Total:</strong> R$ {item.total_price}</p>

                <button onClick={() => handleUpdate(id)}>Salvar alterações</button>
                <button onClick={() => handleRemove(id)}>Remover item</button>
              </div>
            );
          })}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="total-section">
          <h3>Total Geral: R$ {calculateTotal()}</h3>
        </div>
      )}

      <button className="back-button" onClick={() => navigate("/products")}>
        ← Voltar aos Produtos
      </button>
    </div>
  );
}

export default Cart;
