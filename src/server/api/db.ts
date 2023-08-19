import mysql from "mysql2/promise";

const dbconnnection = await mysql.createConnection({
  host: "localhost",
  database: "crimson_paints",
  user: "root",
  password: "root",
});

export default dbconnnection;
