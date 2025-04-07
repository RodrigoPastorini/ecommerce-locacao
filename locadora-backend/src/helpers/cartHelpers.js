const knex = require('../database/knex');
const { v4: uuidv4 } = require('uuid');

/**
 * Cria um carrinho padrão para o usuário, caso ele ainda não tenha.
 * @param {string} userId - ID do usuário
 * @returns {Promise<string>} ID do carrinho
 */
async function createDefaultCart(userId) {

  const existingCart = await knex('carts')
    .where({ user_id: userId, name: 'Carrinho padrão' })
    .first();

  if (existingCart) {
    return existingCart.id;
  }

  const newCartId = uuidv4();
  await knex('carts').insert({
    id: newCartId,
    user_id: userId,
    name: 'Carrinho padrão'
  });

  return newCartId;
}

module.exports = {
  createDefaultCart
};
