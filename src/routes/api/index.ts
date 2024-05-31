import express, { Router } from "express";
import { AdminRouter } from "./admin.router";
import { UserRouter } from "./user.router";

const router: Router = express.Router();

router.use("/admin", AdminRouter);
router.use("/user", UserRouter);

export { router };
