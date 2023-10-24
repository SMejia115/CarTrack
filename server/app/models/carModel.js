import { DataTypes } from 'sequelize';
import sequelize from '../../config/db/dbconection.js';
import Client from './clientModel.js';

// CREATE TABLE Car(
// 	carID INT AUTO_INCREMENT,
//     brand VARCHAR(30) NOT NULL,
//     model VARCHAR(30) NOT NULL,
//     year VARCHAR (4) NOT NULL,
//     color VARCHAR (20) NOT NULL,
//     fuelType VARCHAR (20) NOT NULL,
//     chassisNumber VARCHAR(30) NOT NULL UNIQUE,
//     engineNumber VARCHAR(30) NOT NULL,
//     licensePlate VARCHAR(7) NOT NULL UNIQUE,
//     city VARCHAR(25) NOT NULL,
//     appraisal FLOAT NOT NULL,
//     cylinderCapacity  VARCHAR(25) NOT NULL,
// 	transitLicenseNumber VARCHAR(30) NOT NULL UNIQUE,
//     soatDate DATE,
//     tecnoDate DATE,
//     previousOwner INT,
//     type ENUM('sedan', 'suv', 'pickup', 'hatchback', 'convertible', 'other') NOT NULL,
//     status ENUM('available', 'sold'),
//     CONSTRAINT `PK_carID` PRIMARY KEY (carID),
//     CONSTRAINT `FK_previousOwner` FOREIGN KEY (previousOwner) REFERENCES client(clientID)
// );

const Car = sequelize.define('Car', {
  carID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  brand: {type: DataTypes.STRING(30), allowNull: false},
  model: {type: DataTypes.STRING(30), allowNull: false},
  year: {type: DataTypes.STRING(4), allowNull: false},
  color: {type: DataTypes.STRING(20), allowNull: false},
  fuelType: {type: DataTypes.STRING(20), allowNull: false},
  chassisNumber: {type: DataTypes.STRING(30), allowNull: false, unique: true},
  engineNumber: {type: DataTypes.STRING(30), allowNull: false},
  licensePlate: {type: DataTypes.STRING(7), allowNull: false, unique: true},
  city: {type: DataTypes.STRING(25), allowNull: false},
  appraisal: {type: DataTypes.FLOAT, allowNull: false},
  cylinderCapacity: {type: DataTypes.STRING(25), allowNull: false},
  transitLicenseNumber: {type: DataTypes.STRING(30), allowNull: false, unique: true},
  soatDate: {type: DataTypes.DATE},
  tecnoDate: {type: DataTypes.DATE},
  previousOwner: {type: DataTypes.INTEGER, references: {model: Client, key: 'clientID'}},
  type: {type: DataTypes.ENUM('sedan', 'suv', 'pickup', 'hatchback', 'convertible', 'other'), allowNull: false},
  status: {type: DataTypes.ENUM('available', 'sold'), allowNull: false}
}, {timestamps: false,
    tableName: 'car'});

export default Car;

