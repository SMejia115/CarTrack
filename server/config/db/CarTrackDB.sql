SHOW DATABASES;
USE cartrack;

CREATE TABLE Client(
	clientID INT AUTO_INCREMENT,
    identificationNumber VARCHAR(30),
    firstName VARCHAR(20) NOT NULL,
    secondName VARCHAR(20),
    lastName VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(15) NOT NULL,
    boolReports BIT DEFAULT 0 NOT NULL,
    state BIT DEFAULT 1 NOT NULL,
    CONSTRAINT `PK_clientID` PRIMARY KEY (clientID)
);

CREATE TABLE ClientReports(
	reportID INT AUTO_INCREMENT,
    clientID INT NOT NULL,
    reportDocURL VARCHAR(500) NOT NULL,
    CONSTRAINT `PK_reportID` PRIMARY KEY (reportID),
    CONSTRAINT `FK_clientID` FOREIGN KEY (clientID) REFERENCES client(clientID)
);

CREATE TABLE Car(
	carID INT AUTO_INCREMENT,
    brand VARCHAR(30) NOT NULL,
    model VARCHAR(30) NOT NULL,
    year VARCHAR (4) NOT NULL,
    color VARCHAR (20) NOT NULL,
    fuelType VARCHAR (20) NOT NULL,
    chassisNumber VARCHAR(30) NOT NULL UNIQUE,
    engineNumber VARCHAR(30) NOT NULL,
    licensePlate VARCHAR(7) NOT NULL UNIQUE,
    city VARCHAR(25) NOT NULL,
    appraisal FLOAT NOT NULL,
    cylinderCapacity  VARCHAR(25) NOT NULL,
	transitLicenseNumber VARCHAR(30) NOT NULL UNIQUE,
    soatDate DATE,
    tecnoDate DATE,
    previousOwner INT,
    type ENUM('sedan', 'suv', 'pickup', 'hatchback', 'convertible', 'other') NOT NULL,
    status ENUM('available', 'sold'),
    CONSTRAINT `PK_carID` PRIMARY KEY (carID),
    CONSTRAINT `FK_previousOwner` FOREIGN KEY (previousOwner) REFERENCES client(clientID)
);

CREATE TABLE carImg(
	imgID INT AUTO_INCREMENT,
    carID INT NOT NULL,
    ImageURL varchar(500) NOT NULL,
    CONSTRAINT `PK_imgID` PRIMARY KEY (imgID),
    CONSTRAINT `FK_carID` FOREIGN KEY (carID) REFERENCES car(carID)
);

CREATE TABLE user(
	userID INT AUTO_INCREMENT,
    userName VARCHAR(25) NOT NULL,
    password VARCHAR(100) NOT NULL,
    identificationNumber VARCHAR(30) NOT NULL,
    firstName VARCHAR(25) NOT NULL,
    secondName VARCHAR(25),
    lastName VARCHAR(25) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role ENUM('seller', 'admin') NOT NULL,
    state BIT DEFAULT 1 NOT NULL,
    CONSTRAINT `PK_userID` PRIMARY KEY (userID)
);

CREATE TABLE buy(
	buyID INT AUTO_INCREMENT,
    buyDate DATE NOT NULL,
    sellerID INT NOT NULL, /*Cliente que al que se le compra el carro*/
    buyerID INT NOT NULL, /* Vendedor o administrador que recibe el carro */
    carID INT NOT NULL,
    CONSTRAINT `PK_buyID` PRIMARY KEY (buyID),
    CONSTRAINT `FK_sellerID` FOREIGN KEY (sellerID) REFERENCES client(clientID),
    CONSTRAINT `FK_buyerID` FOREIGN KEY (buyerID) REFERENCES user(userID),
    CONSTRAINT `FK_carID_buy` FOREIGN KEY (carID) REFERENCES car(carID)
);

CREATE TABLE sale(
	saleID INT AUTO_INCREMENT,
    carID INT NOT NULL,
    saleDate DATE NOT NULL,
    clientID INT NOT NULL,
    sellerID INT NOT NULL,
    totalPrice FLOAT NOT NULL,
    CONSTRAINT `PK_saleID` PRIMARY KEY (saleID),
    CONSTRAINT `FK_carID_sale` FOREIGN KEY (carID) REFERENCES car(carID),
    CONSTRAINT `FK_clientID_sale` FOREIGN KEY (clientID) REFERENCES client(clientID),
    CONSTRAINT `FK_sellerID_sale` FOREIGN KEY (sellerID) REFERENCES user(userID)
);

INSERT INTO user (userName, password, identificationNumber, firstName, secondName, lastName, address, phone, role)
VALUES ('ADMIN', '12345', '123456789', 'Santiago', '', 'Mejía', 'Mz 15 Cs 14', '3148760201', 'admin');

INSERT INTO user (userName, password, identificationNumber, firstName, secondName, lastName, address, phone, role)
VALUES ('SELLER', '123456', '123456789', 'Jense', '', 'Martinez', 'Mz 871 Cs 14', '3187213958', 'seller');
