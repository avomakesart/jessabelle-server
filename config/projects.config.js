const Pool = require("pg").Pool;

const pool = new Pool({
  user: "zolwzwewlzlihg",
  password: "2af06cc868863e9c885f54ceb45fc1e0bd1dccda12c1f7f0a54f7c8aae2e6e9e",
  host: "ec2-52-1-95-247.compute-1.amazonaws.com",
  port: 5432,
  database: "dd7n9u4dueie33",
});

module.exports = pool;
