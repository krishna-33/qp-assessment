import express, { Request, Response } from "express";
import userController from "../../controllers/user.controller";
import statusCodes from "../../utils/status";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";
import sequelize from "../../../config/sequelize";


const router = express.Router();

router.get("/grocery-items", async (req: Request, res: Response) => {
  try {
    const groceryItems = await userController.getGroceryItems();
    sendSuccessResponse(
      res,
      groceryItems,
      "GROCERY_ITEM_RETRIEVED",
      statusCodes["SUCCESS"]
    );
  } catch (error) {
    sendErrorResponse(res, "SOMETHING_WENT_WRONG", statusCodes["ERROR"]);
  }
});

router.post("/order", async (req: Request, res: Response) => {
  const t = await sequelize.transaction();
  try {
    const { user_id, items, total } = req.body;
    await userController.placeOrder(user_id, items, total, t);
    t.commit();
    sendSuccessResponse(res, {}, "ORDER_PLACED", statusCodes["RESOURCE_ADDED"]);
  } catch (error) {
    console.log(error);
    t.rollback();
    sendErrorResponse(res, "SOMETHING_WENT_WRONG", statusCodes["ERROR"]);
  }
});

export { router as UserRouter };
