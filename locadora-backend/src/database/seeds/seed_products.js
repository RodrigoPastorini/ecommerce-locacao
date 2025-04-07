const { v4: uuidv4 } = require("uuid");

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.seed = async function (knex) {
  await knex("products").del();

  await knex("products").insert([
    {
      id: uuidv4(),
      name: "Betoneira 400L",
      description: "Ideal para mistura de concreto em obras de pequeno e médio porte.",
      image_url: "/images/betoneira.jpg",
      price: 250,
      stock: 4,
      daily_price: 30,
      weekly_price: 160,
      biweekly_price: 280,
      monthly_price: 500,
    },
    {
      id: uuidv4(),
      name: "Plataforma Elevatória Tesoura",
      description: "Utilizada para trabalhos em altura com segurança.",
      image_url: "/images/plataforma.jpg",
      price: 500,
      stock: 2,
      daily_price: 80,
      weekly_price: 450,
      biweekly_price: 800,
      monthly_price: 1500,
    },
    {
      id: uuidv4(),
      name: "Compactador de Solo",
      description: "Compacta terra e asfalto em pequenas áreas.",
      image_url: "/images/compactador.jpg",
      price: 300,
      stock: 5,
      daily_price: 40,
      weekly_price: 220,
      biweekly_price: 400,
      monthly_price: 700,
    },
    {
      id: uuidv4(),
      name: "Andaime Tubular",
      description: "Estrutura metálica para acesso seguro em altura.",
      image_url: "/images/andaime.jpg",
      price: 100,
      stock: 10,
      daily_price: 10,
      weekly_price: 50,
      biweekly_price: 90,
      monthly_price: 150,
    }
  ]);
};
