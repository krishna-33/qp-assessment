import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/sequelize";

class GroceryItem extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GroceryItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "grocery_items",
    modelName: "GroceryItem",
    timestamps: true,
  }
);

export {GroceryItem};
