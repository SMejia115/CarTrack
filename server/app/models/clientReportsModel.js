import { DataTypes } from 'sequelize';
import sequelize from '../../config/db/dbconection.js';
import Client from './clientModel.js';

// CREATE TABLE ClientReports(
// 	reportID INT AUTO_INCREMENT,
//     clientID INT NOT NULL,
//     reportDocURL VARCHAR(500) NOT NULL,
//     CONSTRAINT `PK_reportID` PRIMARY KEY (reportID),
//     CONSTRAINT `FK_clientID` FOREIGN KEY (clientID) REFERENCES client(clientID)
// );

const ClientReports = sequelize.define('ClientReports', {
    "reportID": {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    "clientID": {type: DataTypes.INTEGER, allowNull: false, references: {model: Client, key: 'clientID'}},
    "reportDocURL": {type: DataTypes.STRING(500), allowNull: false}
}, {timestamps: false,
    tableName: 'clientReports'});

export default ClientReports;