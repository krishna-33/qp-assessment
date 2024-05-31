import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import { router as indexRouter } from "./routes";
import sequelize  from "../config/sequelize";

const app = express();
const PORT: number = parseInt(process.env.APP_PORT as string, 10);

app.use(bodyParser.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    await sequelize.sync(); 
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
