export const messages = {
  GROCERY_ITEM_CREATED: "Grocery item created",
  GROCERY_ITEM_UPDATED: "Grocery Item updated",
  SOMETHING_WENT_WRONG: "Something went wrong",
  GROCERY_ITEM_NOT_FOUND: "Grocery Item not found",
  GROCERY_ITEM_RETRIEVED: "Grocery items Retrieved",
  GROCERY_ITEM_REMOVED: "Grocery Item Removed",
  SUCCESS: "Success",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  INVENTORY_UPDATED: "Inventory Updated",
  ORDER_PLACED: "Order Placed",
} as const;

export type Messages = typeof messages;
