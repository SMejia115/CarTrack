import Buy from '../models/buyModel.js';

//Obtain all buys

export const getBuys = async (req, res) => {
  try {
    const buys = await Buy.findAll();

    if (buys.length == 0) { 
      return res.status(404).json({message: 'No buys found'})
    }

    res.status(200).json(buys);
  } catch (error) {
    res.status(400).json({message: 'Error getting buys'});
  }
}

// Obtain buy by ID

export const getBuyByID = async (req, res) => {
  try {
    const buy = await Buy.findByPk(req.params.buyID);

    if (!buy) {
      return res.status(404).json({message: 'Buy not found'})
    }
    
    res.status(200).json(buy);

  } catch (error) {
    res.status(400).json({ message: 'Error retrieving buy by id', data: {} });
  }
}

// Obtain buy by sellerID

export const getBuyBySellerID = async (req, res) => {
  try {
    const buys = await Buy.findAll({where: {sellerID: req.params.sellerID}});

    if (buys.length == 0) {
      return res.status(404).json({message: 'Buys not found'})
    }
    
    res.status(200).json(buys);

  } catch (error) {
    res.status(400).json({ message: 'Error retrieving buys by sellerID', data: {} });
  }
}

// Obtain buy by buyerID

export const getBuyByBuyerID = async (req, res) => {
  try {
    const buys = await Buy.findAll({where: {buyerID: req.params.buyerID}});

    if (buys.length == 0) {
      return res.status(404).json({message: 'Buys not found'})
    }
    
    res.status(200).json(buys);

  } catch (error) {
    res.status(400).json({ message: 'Error retrieving buys by buyerID', data: {} });
  }
}

// Create a new buy (buys/add) and set car status to sold

export const createBuy = async (req, res) => {
  try {
    const buy = await Buy.create(req.body);

    res.status(200).json(buy);
  } catch (error) {
    res.status(400).json({ message: 'Error creating buy', data: {} });
  }
}

