import { DataTypes }  from 'sequelize';
import sequelize from '../../config/db/dbconection.js';
import Car from './carModel.js';
import User from './userModel.js';
import Client from './clientModel.js';

// CREATE TABLE buy(
// 	buyID INT AUTO_INCREMENT,
//     buyDate DATE NOT NULL,
//     sellerID INT NOT NULL, /*Cliente que al que se le compra el carro*/
//     buyerID INT NOT NULL, /* Vendedor o administrador que recibe el carro */
//     carID INT NOT NULL,
//     CONSTRAINT `PK_buyID` PRIMARY KEY (buyID),
//     CONSTRAINT `FK_sellerID` FOREIGN KEY (sellerID) REFERENCES client(clientID),
//     CONSTRAINT `FK_buyerID` FOREIGN KEY (buyerID) REFERENCES user(userID),
//     CONSTRAINT `FK_carID_buy` FOREIGN KEY (carID) REFERENCES car(carID)
// );

const Buy = sequelize.define('Buy', {
  "buyID": {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  "buyDate": {type: DataTypes.DATE, allowNull: false},
  "sellerID": {type: DataTypes.INTEGER, allowNull: false, references: {model: Client, key: 'clientID'}},
  "buyerID": {type: DataTypes.INTEGER, allowNull: false, references: {model: User, key: 'userID'}},
  "carID": {type: DataTypes.INTEGER, allowNull: false, references: {model: Car, key: 'carID'}}
}, {timestamps: false,
  tableName: 'buy'});

export default Buy;