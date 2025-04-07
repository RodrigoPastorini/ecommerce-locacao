const { error } = require("console");
const knex = require("../database/knex");

const getAllProducts = async (req, res) => {
  try {
    const products = await knex("products").select("*");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar os produtos" });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await knex('products').where({ id }).first();

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado!' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar os detalhes do produto' });
  }
};

const search = async (req, res) => {
  try {
    const { query } = req.query; 
    const products = await knex('products')
      .where('name', 'like', `%${query}%`)
      .select('*');

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

module.exports = { getAllProducts, getProductDetails, search };
