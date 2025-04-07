import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedRentalType, setSelectedRentalType] = useState("daily");
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Sessão expirada. Faça login novamente.");
      navigate("/");
      return;
    }

    axios
      .get(`http://localhost:3000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setProduct(response.data))
      .catch((error) => {
        console.error("Erro ao buscar detalhes do produto:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        }
      });
  }, [id, token, navigate]);

  const handleAddToCart = () => {
    axios
      .post(
        "http://localhost:3000/api/cart",
        {
          productId: product.id,
          quantity: quantity,
          rentalType: selectedRentalType,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert("Produto adicionado ao carrinho!");
        navigate("/cart");
      })
      .catch((error) => {
        console.error("Erro ao adicionar ao carrinho:", error);
        alert("Erro ao adicionar ao carrinho.");
      });
  };

  if (!product) return <p>Carregando...</p>;

  return (
    <div className="container">
      <button onClick={() => navigate("/products")} className="back-button">
        ⬅ Voltar
      </button>

      <div className="product-details">
        <h2>{product.name}</h2>
        <img src={product.image_url} alt={product.name} className="product-image" />
        <p>{product.description}</p>

        <div className="price-container">
          <p>Diário: <strong>R$ {product.daily_price}</strong></p>
          <p>Semanal: <strong>R$ {product.weekly_price}</strong></p>
          <p>Quinzenal: <strong>R$ {product.biweekly_price}</strong></p>
          <p>Mensal: <strong>R$ {product.monthly_price}</strong></p>
        </div>

        <div className="rental-options">
          <label>Tipo de locação:</label>
          <select
            value={selectedRentalType}
            onChange={(e) => setSelectedRentalType(e.target.value)}
          >
            <option value="daily">Diário</option>
            <option value="weekly">Semanal</option>
            <option value="biweekly">Quinzenal</option>
            <option value="monthly">Mensal</option>
          </select>
        </div>

        <div className="quantity-input">
          <label>Quantidade:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <button className="add-to-cart-button" onClick={handleAddToCart}>
          🛒 Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
