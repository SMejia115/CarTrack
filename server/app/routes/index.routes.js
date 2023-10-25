import express from 'express';
import loginController from '../controllers/loginController.js';
import * as userController from '../controllers/userController.js';
import * as clientController from '../controllers/clientController.js';
import * as carController from '../controllers/carController.js';
import * as carImagesController from '../controllers/carImagesController.js';
import * as clientReportsController from '../controllers/clientReportsController.js';
import * as SaleController from '../controllers/saleController.js';
import multer from 'multer';

// Multer config
const upload = multer();


const router = express.Router();

// Ruta principal (base path /api)
router.get('/', (req, res) => {
	res.status(200).json({
		message: 'Welcome to the API',
		users: {
			allUsers: 'GET /users', // Admin only
			userByID: 'GET /users/:userID',
			userByUsername: 'GET /users/username/:username',
			createUser: 'POST /users',
			updateUser: 'PUT /api/users/:userID',
			deleteUser: 'DELETE /api/users/:userID',
		},
		cars: {
			allCars: 'GET /api/products',
			carByID: 'GET /api/products/:productID',
			createCar: 'POST /api/products',
			updateCar: 'PUT /api/products/:productID',
			deleteCar: 'DELETE /api/products/:productID',
		},
		images: {
			allImages: 'GET /api/images',
			imageByID: 'GET /api/images/:productID',
			createImage: 'POST /api/images',
			deleteImage: 'DELETE /api/images/:productID',
		},
		inventory: {
			allInventory: 'GET /api/inventory',
			inventoryByProductID: 'GET /api/inventory/product/:productID',
			updateInventory: 'PUT /api/inventory/product/:productID',
		},
		orders: {
			allOrders: 'GET /api/orders', // Admin only
			ordersByUserID: 'GET /api/orders/user/:userID',
			createOrder: 'POST /api/orders',
		},
		payment: {
			paymentLinkSuccess: 'POST /api/payment/success',
			paymentLinkCancel: 'POST /api/payment/cancel',
		},
		login: {
			login: 'POST /api/login',
		}
	});
});


// --------------------- L O G I N --------------------- //

// POST

// Ruta de validación de login
router.post('/login', loginController)

export default router;



// --------------------- U S E R S --------------------- //

// GET

// Obtain all users
router.get('/users', userController.getUsers);

// Obtain user by ID
router.get('/users/:userID', userController.getUserByID);

// Obtain user by username
router.get('/users/username/:username', userController.getUserByUsername);

// POST

// Create a new user
router.post('/users', userController.createUser);

// PUT

// Update user by ID



// --------------------- C L I E N T S --------------------- //

// GET

// Obtain all clients
router.get('/clients', clientController.getClients);

// Obtain client by ID
router.get('/clients/:clientID', clientController.getClientByID);

// Obtain client by identification number
router.get('/clients/identificationNumber/:identificationNumber', clientController.getClientByIdentificationNumber);


// POST

// Create a new client
router.post('/clients', clientController.createClient);

// --------------------- C A R S --------------------- //

// Obtain all cars
router.get('/cars', carController.getCars);

// Obtain car by ID
router.get('/cars/:carID', carController.getCarByID);

// Obtain sold cars
router.get('/sell/cars', carController.getSoldCars);

// Obtain available cars
router.get('/available/cars', carController.getAvailableCars);

// Obtain available cars with her images
router.get('/available/cars/images', carController.getAvailableCarsWithImages);

// Obtain car by ID with her images
router.get('/car/images/:carID', carController.getCarsWithImagesbyID);

// POST

// Create a new car

router.post('/cars', carController.createCar);


// --------------------- C A R S   I M G S --------------------- //

// POST

// Create a new car image

router.post('/image/add/:carID', upload.single('image'), carImagesController.createCarImage);

// GET

// Obtain all car images

router.get('/images', carImagesController.getCarImages);
 

// --------------------- C L I E N T   R E P O R T S --------------------- //

// GET

// Obtain all client reports

router.get('/reports', clientReportsController.getClientReports);


// Create a new client report

router.post(`/clients/report/add/:identificationNumber`, upload.single('report'), clientReportsController.createClientReport);

// --------------------- S A L E S --------------------- //

// GET

// Obtain all sales

router.get('/sales', SaleController.getSales);


// CREATE

// Create a new sale
router.post('/sales/add', SaleController.createSale);



