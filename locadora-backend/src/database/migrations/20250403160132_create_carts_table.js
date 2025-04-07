exports.up = function(knex) {
  return knex.schema.createTable('carts', function(table) {
    table.uuid('id').primary();
    table.uuid('user_id').notNullable();
    table.string('name').defaultTo('Carrinho padrão');
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('carts');
};
