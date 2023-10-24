import { DataTypes } from 'sequelize';
import sequelize from '../../config/db/dbconection.js';

// CREATE TABLE Client(
// 	clientID INT AUTO_INCREMENT,
//     identificationNumber VARCHAR(30) NOT NULL,
//     firstName VARCHAR(20) NOT NULL,
//     secondName VARCHAR(20),
//     lastName VARCHAR(20) NOT NULL,
//     address TEXT NOT NULL,
//     phone VARCHAR(15) NOT NULL,
//     boolReports BIT DEFAULT 0 NOT NULL,
//     state BIT DEFAULT 1 NOT NULL,
//     CONSTRAINT `PK_clientID` PRIMARY KEY (clientID)
// );

const Client = sequelize.define('Client', {
    "clientID": {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    "identificationNumber": {type: DataTypes.STRING(30), allowNull: false},
    "firstName": {type: DataTypes.STRING(20), allowNull: false},
    "secondName": {type: DataTypes.STRING(20)},
    "lastName": {type: DataTypes.STRING(20), allowNull: false},
    "address": {type: DataTypes.TEXT, allowNull: false},
    "phone": {type: DataTypes.STRING(15), allowNull: false},
    "boolReports": {type: DataTypes.BOOLEAN, defaultValue: 0, allowNull: false}
}, {timestamps: false,
    tableName: 'client'});

export default Client;
