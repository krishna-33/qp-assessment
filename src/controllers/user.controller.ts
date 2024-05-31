import { Transaction } from "sequelize";
import { GroceryItem } from "../models/groeryItems.model";
import Orders from "../models/orders.model";
import { Item } from "../utils/interface";

async function getGroceryItems(): Promise<GroceryItem[]> {
  const groceryItems = await GroceryItem.findAll();
  return groceryItems;
}

async function placeOrder(user_id: number, items: any, total: string, t: Transaction): Promise<{}> {
  const newOrder = await Orders.create(
    { user_id, items, total },
    {
      transaction: t,
    }
  );
  items?.forEach(async (el: Item) => {
    const groceryItem = await GroceryItem.findByPk(el?.id);
    if (groceryItem) {
      groceryItem.quantity -= el?.quantity;
      await groceryItem.save();
    }
  });
  return newOrder;
}
export default { getGroceryItems, placeOrder };
