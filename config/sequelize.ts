import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    dialect: (process.env.DB_DIALECT as any) || "mysql",
  }
);

// async function createDatabase() {
//   try { 
//     await sequelize.query(
//       `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`
//     );
//     console.log("Database created successfully or already exists");
//   } catch (error) {
//     console.error("Error creating database:", error);
//   }
// }



// createDatabase();

export default sequelize;
