import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import api from "../services/api";
import "../styles/Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [updatedQuantities, setUpdatedQuantities] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    api
      .get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCartItems(response.data);
        const quantities = {};
        response.data.forEach((item) => {
          quantities[item.id] = item.quantity;
        });
        setUpdatedQuantities(quantities);
      })
      .catch((error) => console.error("Erro ao buscar carrinho", error));
  }, [token]);

  const handleUpdate = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    const newQuantity = updatedQuantities[itemId];

    if (!item || newQuantity < 1) return;

    api
      .put(
        `/api/cart/${itemId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => alert("Quantidade atualizada!"))
      .catch((error) => console.error("Erro ao atualizar item", error));
  };

  const handleRemove = (itemId) => {
    api
      .delete(`/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setCartItems(cartItems.filter((item) => item.id !== itemId)))
      .catch((error) => console.error("Erro ao remover item", error));
  };

  const totalGeral = cartItems.reduce((total, item) => total + item.total_price, 0);

  return (
    <div className="container">
      <Header />
      <h2>Carrinho de Compras</h2>

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image_url} alt={item.name} />
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p><strong>Tipo de locação:</strong> {item.rental_type}</p>
                <p><strong>Total:</strong> R$ {item.total_price.toFixed(2)}</p>

                <input
                  type="number"
                  min="1"
                  value={updatedQuantities[item.id] || item.quantity}
                  onChange={(e) =>
                    setUpdatedQuantities({
                      ...updatedQuantities,
                      [item.id]: parseInt(e.target.value),
                    })
                  }
                />
                <button onClick={() => handleUpdate(item.id)}>Salvar alterações</button>
                <button onClick={() => handleRemove(item.id)} className="remove-button">
                  Remover
                </button>
              </div>
            </div>
          ))}
          <div className="total-section">
            <h3>Total Geral: R$ {totalGeral.toFixed(2)}</h3>
            <button className="checkout-button">Finalizar Pedido</button>
          </div>
        </div>
      )}

      <button onClick={() => navigate("/products")} className="back-button">
        ⬅ Voltar aos produtos
      </button>
    </div>
  );
}

export default Cart;
