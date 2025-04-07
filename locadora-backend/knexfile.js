module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './src/database/locadora.db'
      },
      useNullAsDefault: true,
      migrations: {
        directory: './src/database/migrations'
      },
      seeds: {
        directory: "./src/database/seeds"
      }
    }
  };
  