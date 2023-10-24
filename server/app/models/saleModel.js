import { DataTypes } from "sequelize";
import sequelize from "../../config/db/database.js";
import Car from "./carModel.js";
import Client from "./clientModel.js";
import User from "./userModel.js";
import Buy from "./buyModel.js";

// CREATE TABLE sale(
// 	saleID INT AUTO_INCREMENT,
//     carID INT NOT NULL,
//     saleDate DATE NOT NULL,
//     clientID INT NOT NULL,
//     sellerID INT NOT NULL,
//     totalPrice FLOAT NOT NULL,
//     CONSTRAINT `PK_saleID` PRIMARY KEY (saleID),
//     CONSTRAINT `FK_carID_sale` FOREIGN KEY (carID) REFERENCES car(carID),
//     CONSTRAINT `FK_clientID_sale` FOREIGN KEY (clientID) REFERENCES client(clientID),
//     CONSTRAINT `FK_sellerID_sale` FOREIGN KEY (sellerID) REFERENCES user(userID)
// );

const Sale = sequelize.define('Sale', {
  'saleID': {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  'carID': {type: DataTypes.INTEGER, allowNull: false, references: {model: Car, key: 'carID'}},
  'saleDate': {type: DataTypes.DATE, allowNull: false},
  'clientID': {type: DataTypes.INTEGER, allowNull: false, references: {model: Client, key: 'clientID'}},
  'sellerID': {type: DataTypes.INTEGER, allowNull: false, references: {model: User, key: 'userID'}},
  'totalPrice': {type: DataTypes.FLOAT, allowNull: false},
}, {timestamps: false,
  tableName: 'sale'});

export default Sale;