import Sale from '../models/saleModel.js';
import Car from '../models/carModel.js';


//Obtain all sales

export const getSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();

    if (sales.length == 0) {
      return res.status(404).json({message: 'No sales found'})
    }

    res.status(200).json(sales);
  } catch (error) {
    res.status(400).json({message: 'Error getting sales'});
  }
}

// Obtain sale by ID

export const getSaleByID = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.saleID);

    if (!sale) {
      return res.status(404).json({message: 'Sale not found'})
    }
    
    res.status(200).json(sale);

  } catch (error) {
    res.status(400).json({ message: 'Error retrieving sale by id', data: {} });
  }
}


//Obtain sale by sellerID

export const getSaleBySellerID = async (req, res) => {
  try {
    const sales = await Sale.findAll({where: {sellerID: req.params.sellerID}});

    if (sales.length == 0) {
      return res.status(404).json({message: 'Sales not found'})
    }
    
    res.status(200).json(sales);

  } catch (error) {
    res.status(400).json({ message: 'Error retrieving sales by sellerID', data: {} });
  }
}


// Obtain sale by buyerID

export const getSaleByBuyerID = async (req, res) => {
  try {
    const sales = await Sale.findAll({where: {buyerID: req.params.buyerID}});

    if (sales.length == 0) {
      return res.status(404).json({message: 'Sales not found'})
    }
    
    res.status(200).json(sales);

  } catch (error) {
    res.status(400).json({ message: 'Error retrieving sales by buyerID', data: {} });
  }
}


// Create a new sale (sales/add) and update the car status to sold

export const createSale = async (req, res) => {
  try {
    const { carID, saleDate, clientID, sellerID, totalPrice } = req.body;
    const car = await Car.findByPk(carID);

    if (!car) {
      return res.status(404).json({message: 'Car not found'})
    }

    if (car.status == 'sold') {
      return res.status(400).json({message: 'Car already sold'})
    }

    const sale = await Sale.create({
      carID,
      saleDate,
      clientID,
      sellerID,
      totalPrice
    });

    await Car.update({status: 'sold'}, {where: {carID: carID}});

    res.status(201).json({message: 'Sale created successfully'});

  } catch (error) {
    res.status(400).json({message: 'Error creating sale' + error});
    console.log('Error creating sale:', error);
  } 
};