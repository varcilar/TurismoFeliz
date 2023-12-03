const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.HOST_,
  user: process.env.USER_,
  password: process.env.PASSWORD_,
  database: process.env.DATABASE_,
  port: process.env.PORT_,
});

module.exports = pool;
