import { Transaction, where } from "sequelize";
import { GroceryItem } from "../models/groeryItems.model";


  async function addGroceryItem(
    name: string,
    price: string,
    quantity: number,
    t: Transaction
  ): Promise<GroceryItem> {    
    const newItem = await GroceryItem.create(
      { name, price, quantity },
      {
        transaction: t,
      }
    );
    return newItem;
  }
  async function getGroceryItems(): Promise<GroceryItem[]> {
    const groceryItems = await GroceryItem.findAll();
    return groceryItems;
  }
   
  async function getGrOceryItemById(Id: Number): Promise<GroceryItem | null> {
     const groceryItem = await GroceryItem.findOne(
       {
         raw: true,
         where: {
           id: Number(Id),
         },
       }
     );
    return groceryItem;
  }

  async function removeGroceryItem(itemId: string, t: Transaction): Promise<void> {
    await GroceryItem.destroy({ where: { id: itemId }});
  }
 async function updateGroceryItem(
    Id: string,
    name: string,
    price: number,
    quantity: number,
    t: Transaction
  ): Promise<void> {
    await GroceryItem.update({ name, price, quantity }, { where: { id: Id }});
   }

  async function manageInventory(
    Id: string,
    action: "increase" | "decrease",
    quantity: number
  ): Promise<void> {
    const groceryItem = await GroceryItem.findByPk(Number(Id));
    if (groceryItem) {
      if (action === "increase") {
        groceryItem.quantity += quantity;
      } else {
        groceryItem.quantity -= quantity;
      }
      await groceryItem.save();
    }
  }
export default {
  addGroceryItem,
  getGroceryItems,
  getGrOceryItemById,
  removeGroceryItem,
  updateGroceryItem,
  manageInventory,
};



