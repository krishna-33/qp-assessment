import express, { Request, Response } from "express";
import adminController from "../../controllers/admin.controller";
import sequelize from "../../../config/sequelize";
import statusCodes from "../../utils/status";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";

const router = express.Router();

router.post("/grocery-items", async (req: Request, res: Response) => {
  const t = await sequelize.transaction();
  try {
    const { name, price, quantity } = req.body
    const createdGroceryItem = await adminController.addGroceryItem(
      name,
      price,
      quantity,
      t
    );
    await t.commit();
    sendSuccessResponse(
      res,
      createdGroceryItem,
      "GROCERY_ITEM_CREATED",
      statusCodes["RESOURCE_ADDED"]
    );
  } catch (error) {
    console.log("error", error);
    
    await t.rollback();
    sendErrorResponse(res, "SOMETHING_WENT_WRONG", statusCodes["ERROR"]);
  }
});

router.get("/grocery-items", async (req: Request, res: Response) => {
  try {
    const groceryItems = await adminController.getGroceryItems();
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

router.delete("/grocery-items/:Id", async (req: Request, res: Response) => {
  const t = await sequelize.transaction();
  try {
    const Id = req.params.Id;
     const groceryItem = await adminController.getGrOceryItemById(Number(Id));
    if (!groceryItem) {
      return sendErrorResponse(
        res,
        "GROCERY_ITEM_NOT_FOUND",
        statusCodes["NOT_FOUND"]
      );
      await t.commit();
    } else {
    await adminController.removeGroceryItem(Id, t);
    await t.commit();
     sendSuccessResponse(
       res,
       {},
       "GROCERY_ITEM_REMOVED",
       statusCodes["SUCCESS"]
     );
    }
  } catch (error) {
    await t.rollback();
    sendErrorResponse(res, "SOMETHING_WENT_WRONG", statusCodes["ERROR"]);

  }
});

router.put("/grocery-items/:Id", async (req: Request, res: Response) => {
  
  const t = await sequelize.transaction();
  try {
    const Id = req.params.Id;
    const { name, price, quantity } = req.body;

    const groceryItem = await adminController.getGrOceryItemById(Number(Id));
    if (!groceryItem) {
      await t.commit();
      return sendErrorResponse(
        res,
        "GROCERY_ITEM_NOT_FOUND",
        statusCodes["NOT_FOUND"]
      );
    } else {
    await adminController.updateGroceryItem(Id, name, price, quantity, t);
    await t.commit();
     sendSuccessResponse(
       res,
       {},
       "GROCERY_ITEM_UPDATED",
       statusCodes["SUCCESS"]
     );
  }
  } catch (error) {
    await t.rollback();
    sendErrorResponse(res, "SOMETHING_WENT_WRONG", statusCodes["ERROR"]);

  }
});

router.put(
  "/grocery-items/:Id/manage-inventory",
  async (req: Request, res: Response) => {
    const t = await sequelize.transaction();
    try {
      const Id = req.params.Id;
      const { action, quantity } = req.body;
       const groceryItem = await adminController.getGrOceryItemById(Number(Id));
    if (!groceryItem) {
      await t.commit();
      return sendErrorResponse(
        res,
        "GROCERY_ITEM_NOT_FOUND",
        statusCodes["NOT_FOUND"]
      );
    } else {
      await adminController.manageInventory(Id, action, quantity);
      await t.commit();
       sendSuccessResponse(res, {}, "INVENTORY_UPDATED", statusCodes["SUCCESS"]);
    }
    } catch (error) {
      await t.rollback();
       sendErrorResponse(res, "SOMETHING_WENT_WRONG", statusCodes["ERROR"]);

    }
  }
);

export { router as AdminRouter };
