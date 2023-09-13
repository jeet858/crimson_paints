import mysql from "mysql2/promise";

const dbConnection = await mysql.createConnection({
  host: "crimson-paints-instance.c48rovmhtckp.ap-south-1.rds.amazonaws.com",
  database: "crimson_db",
  user: "crimson_dev",
  password: "paints123",
});
export default dbConnection;
