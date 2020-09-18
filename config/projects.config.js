const Pool = require("pg").Pool;

const pool = new Pool({
  user: "alvarocastle",
  password: "BLUEcat2518",
  host: "localhost",
  port: 5432,
  database: "jessapi",
});

module.exports = pool;
