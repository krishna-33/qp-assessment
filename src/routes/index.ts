import express, { Router } from "express";
import { router as apiRoutes } from "./api";

const router: Router = express.Router();

router.use("/api", apiRoutes);

export { router };
