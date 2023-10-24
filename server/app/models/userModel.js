import { DataTypes } from "sequelize";
import sequelize from "../../config/db/dbconection.js";


// CREATE TABLE user(
// 	userID INT AUTO_INCREMENT,
//     userName VARCHAR(25) NOT NULL,
//     password VARCHAR(100) NOT NULL,
//     identificationNumber VARCHAR(30) NOT NULL,
//     firstName VARCHAR(25) NOT NULL,
//     secondName VARCHAR(25),
//     lastName VARCHAR(25) NOT NULL,
//     address TEXT NOT NULL,
//     phone VARCHAR(20) NOT NULL,
//     role ENUM('seller', 'admin') NOT NULL,
//     state BIT DEFAULT 1 NOT NULL,
//     CONSTRAINT `PK_userID` PRIMARY KEY (userID)
// );

const User = sequelize.define('User', {
  "userID": {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  "userName": {type: DataTypes.STRING(25), allowNull: false},
  "password": {type: DataTypes.STRING(500), allowNull: false},
  "identificationNumber": {type: DataTypes.STRING(30), allowNull: false},
  "firstName": {type: DataTypes.STRING(25), allowNull: false},
  "secondName": {type: DataTypes.STRING(25)},
  "lastName": {type: DataTypes.STRING(25), allowNull: false},
  "address": {type: DataTypes.TEXT, allowNull: false},
  "phone": {type: DataTypes.STRING(20), allowNull: false},
  "role": {type: DataTypes.ENUM('seller', 'admin'), allowNull: false},
  "state": {type: DataTypes.BOOLEAN, defaultValue: 1, allowNull: false}
}, {timestamps: false,
    tableName: 'user'});

export default User;