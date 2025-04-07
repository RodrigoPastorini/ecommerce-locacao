const knex = require('../database/knex');
const { v4: uuidv4 } = require('uuid');
const { createDefaultCart } = require('../helpers/cartHelpers'); 

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, rentalType } = req.body;
    const { userId } = req.user;

    const cartId = await createDefaultCart(userId);

    const product = await knex('products').where({ id: productId }).first();
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado!' });
    }

    const allowedRentalTypes = ['daily', 'weekly', 'biweekly', 'monthly'];
    if (!allowedRentalTypes.includes(rentalType)) {
      return res.status(400).json({ error: 'Tipo de locação inválido.' });
    }

    let rentalPrice = product[`${rentalType}_price`];
    const totalPrice = rentalPrice * quantity;

    const existingCartItem = await knex('cart_items')
      .where({ cart_id: cartId, product_id: productId, rental_type: rentalType })
      .first();

    if (existingCartItem) {
      await knex('cart_items')
        .where({ cart_id: cartId, product_id: productId, rental_type: rentalType })
        .update({
          quantity: existingCartItem.quantity + quantity,
          total_price: existingCartItem.total_price + totalPrice
        });
    } else {
      await knex('cart_items').insert({
        id: uuidv4(),
        cart_id: cartId,
        product_id: productId,
        rental_type: rentalType,
        quantity,
        total_price: totalPrice
      });
    }

    return res.status(201).json({ message: 'Produto adicionado ao carrinho!' });

  } catch (error) {
    console.error('Erro ao adicionar produto ao carrinho:', error);
    return res.status(500).json({ error: 'Erro ao adicionar produto ao carrinho.' });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.user;

    const cartId = await createDefaultCart(userId);

    const cartItems = await knex('cart_items')
      .join('products', 'cart_items.product_id', '=', 'products.id')
      .select(
        'cart_items.id',
        'cart_items.quantity',
        'cart_items.rental_type',
        'cart_items.total_price',
        'products.name',
        'products.image_url',
        'products.daily_price',
        'products.weekly_price',
        'products.biweekly_price',
        'products.monthly_price'
      )
      .where('cart_items.cart_id', cartId);

    if (cartItems.length === 0) {
      return res.status(404).json({ error: 'Carrinho vazio!' });
    }

    return res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar o carrinho de compras.' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId } = req.user;

    const cartId = await createDefaultCart(userId);

    const item = await knex('cart_items')
      .where({ cart_id: cartId, id: productId })
      .first();

    if (!item) {
      return res.status(404).json({ error: 'Produto não encontrado no carrinho!' });
    }

    await knex('cart_items').where({ cart_id: cartId, id: productId }).del();

    return res.status(200).json({ message: 'Produto removido do carrinho!' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao remover o produto do carrinho.' });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const { userId } = req.user;

    if (quantity <= 0) {
      return res.status(400).json({ error: 'Quantidade deve ser maior que 0.' });
    }

    const cartId = await createDefaultCart(userId);

    const item = await knex('cart_items')
      .where({ cart_id: cartId, id: productId })
      .first();

    if (!item) {
      return res.status(404).json({ error: 'Produto não encontrado no carrinho.' });
    }

    const product = await knex('products')
      .where({ id: item.product_id })
      .first();

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado!' });
    }

    let rentalPrice = product[`${item.rental_type}_price`];
    const totalPrice = rentalPrice * quantity;

    await knex('cart_items')
      .where({ cart_id: cartId, id: productId })
      .update({ quantity, total_price: totalPrice });

    return res.status(200).json({ message: 'Quantidade atualizada com sucesso!' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar o carrinho.' });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem
};
