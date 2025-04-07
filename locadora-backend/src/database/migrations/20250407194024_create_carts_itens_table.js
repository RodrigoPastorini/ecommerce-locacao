exports.up = function(knex) {
  return knex.schema.createTable('cart_items', function(table) {
    table.uuid('id').primary();
    table.uuid('cart_id').notNullable();
    table.uuid('product_id').notNullable();
    table.integer('quantity').notNullable();
    table.string('rental_type').notNullable();
    table.decimal('total_price', 10, 2).notNullable();

    table.foreign('cart_id').references('id').inTable('carts').onDelete('CASCADE');
    table.foreign('product_id').references('id').inTable('products');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cart_items');
};
