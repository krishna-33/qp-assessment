import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/sequelize"; 

class Orders extends Model {
  public id!: number;
  public items!: JSON;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Orders.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    total: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "orders",
    modelName: "orders",
    timestamps: true,
  }
);

export default Orders;
