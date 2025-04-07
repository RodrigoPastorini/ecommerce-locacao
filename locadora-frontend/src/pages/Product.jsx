import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Product.css";
import Header from "../components/Header";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [rentalTypes, setRentalTypes] = useState({});
  const [quantities, setQuantities] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Erro ao buscar produtos", error));
  }, [token]);

  const handleAddToCart = (productId) => {
    const rentalType = rentalTypes[productId];
    const quantity = quantities[productId] || 1;

    if (!rentalType) {
      return alert("Selecione um tipo de locação antes de adicionar ao carrinho.");
    }

    axios
      .post(
        "http://localhost:3000/api/cart",
        {
          productId,
          rentalType,
          quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => alert("Produto adicionado ao carrinho!"))
      .catch((error) =>
        console.error("Erro ao adicionar ao carrinho", error)
      );
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <Header />
      <h2>Produtos Disponíveis</h2>

      <input
        type="text"
        placeholder="Buscar produto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p>Nenhum produto encontrado...</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>

              <div className="price-options">
                <p>
                  <strong>Diária:</strong> R$ {product.daily_price}
                </p>
                <p>
                  <strong>Semanal:</strong> R$ {product.weekly_price}
                </p>
                <p>
                  <strong>Quinzenal:</strong> R$ {product.biweekly_price}
                </p>
                <p>
                  <strong>Mensal:</strong> R$ {product.monthly_price}
                </p>
              </div>

              <label htmlFor={`rental-type-${product.id}`}>
                Tipo de Locação:
              </label>
              <select
                id={`rental-type-${product.id}`}
                value={rentalTypes[product.id] || ""}
                onChange={(e) =>
                  setRentalTypes({
                    ...rentalTypes,
                    [product.id]: e.target.value,
                  })
                }
              >
                <option value="">Selecione</option>
                <option value="daily">Diária</option>
                <option value="weekly">Semanal</option>
                <option value="biweekly">Quinzenal</option>
                <option value="monthly">Mensal</option>
              </select>

              <label htmlFor={`quantity-${product.id}`}>Quantidade:</label>
              <input
                type="number"
                min="1"
                value={quantities[product.id] || 1}
                onChange={(e) =>
                  setQuantities({
                    ...quantities,
                    [product.id]: parseInt(e.target.value),
                  })
                }
              />

              <button
                className="add-to-cart"
                onClick={() => handleAddToCart(product.id)}
              >
                Adicionar ao Carrinho
              </button>

              <button
                className="details-button"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                Ver Detalhes
              </button>
            </div>
          ))
        )}
      </div>

      <button className="cart-button" onClick={() => navigate("/cart")}>
        🛒 Ver Carrinho
      </button>
    </div>
  );
}

export default Products;
