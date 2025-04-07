/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("products", function (table) {
        table.uuid("id").primary();
        table.string("name").notNullable();
        table.text("description").notNullable();
        table.string("image_url").notNullable();
        table.decimal("price", 10, 2).notNullable();
        table.integer("stock").notNullable().defaultTo(0);
        table.decimal("daily_price", 10, 2).notNullable();
        table.decimal("weekly_price", 10, 2).notNullable();
        table.decimal("biweekly_price", 10, 2).notNullable();
        table.decimal("monthly_price", 10, 2).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("products");
};
