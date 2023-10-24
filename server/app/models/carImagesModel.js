import { DataTypes } from 'sequelize';
import sequelize from '../../config/db/dbconection.js';
import Car from './carModel.js';

// CREATE TABLE carImg(
// 	imgID INT AUTO_INCREMENT,
//     carID INT NOT NULL,
//     ImageURL varchar(500) NOT NULL,
//     CONSTRAINT `PK_imgID` PRIMARY KEY (imgID),
//     CONSTRAINT `FK_carID` FOREIGN KEY (carID) REFERENCES car(carID)
// );

const CarImage = sequelize.define('CarImages', {
    "imgID": {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    "carID": {type: DataTypes.INTEGER, allowNull: false, references: {model: Car, key: 'carID'}},
    "ImageURL": {type: DataTypes.STRING(500), allowNull: false}
}, {timestamps: false,
    tableName: 'carImg'});

export default CarImage;