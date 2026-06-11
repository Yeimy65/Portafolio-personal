const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Informatica-2026',
  database: 'portafolio_db'
});

module.exports = pool;
