const knex = require('knex');
const path = require('path');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './src/database/locadora.db',
  },
  useNullAsDefault: true,
});

module.exports = db;