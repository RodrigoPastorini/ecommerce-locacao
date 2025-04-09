import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import api from "../services/api";
import "../styles/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Erro ao buscar detalhes", error));
  }, [id, token]);

  if (!product) return <p>Carregando...</p>;

  return (
    <div className="container">
      <Header />
      <div className="product-details">
        <img src={product.image_url} alt={product.name} />
        <div className="info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>

          <ul>
            <li><strong>Diária:</strong> R$ {product.daily_price}</li>
            <li><strong>Semanal:</strong> R$ {product.weekly_price}</li>
            <li><strong>Quinzenal:</strong> R$ {product.biweekly_price}</li>
            <li><strong>Mensal:</strong> R$ {product.monthly_price}</li>
          </ul>

          <button onClick={() => navigate("/products")}>⬅ Voltar</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
