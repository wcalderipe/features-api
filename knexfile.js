const migrations = {
  directory: './db/migrations',
  tableName: 'migrations'
}

const sqliteDefaults = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations
}

module.exports = {
  production: {
    ...sqliteDefaults,
    connection: {
      filename: './db/production.sqlite3'
    },
    seeds: {
      directory: './db/seeds/production'
    }
  },
  development: {
    ...sqliteDefaults,
    connection: {
      filename: './db/development.sqlite3'
    },
    seeds: {
      directory: './db/seeds/development'
    }
  },
  test: {
    ...sqliteDefaults,
    connection: {
      filename: './db/test.sqlite3'
    },
    seeds: {
      directory: './db/seeds/test'
    }
  }
}

