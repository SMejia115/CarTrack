import Sale from '../models/saleModel.js';
import Car from '../models/carModel.js';
import sequelize from 'sequelize';


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


// Obtain de sum of sales by seller

export const calculateSalesBySeller = async () => {
  try {
    console.log('Calculando ventas por vendedor...');
    const salesBySeller = await Sale.findAll({
      attributes: [
        ['sellerID', 'name'], // Alias para el campo sellerID
        [sequelize.fn('sum', sequelize.col('totalPrice')), 'value'], // Alias para el campo totalPrice
      ],
      group: ['sellerID'], // Agrupa por vendedor
    });

    return salesBySeller;
  } catch (error) {
    console.error('Error al calcular las ventas por vendedor:', error);
    throw error;
  }
};

export const calculateSalesBySellerHandler = async (req, res) => {
  try {
    const salesBySeller = await calculateSalesBySeller(); // Invoca la función utilitaria

    // Envía la respuesta HTTP con los resultados
    res.status(200).json(salesBySeller);
  } catch (error) {
    console.error('Error al calcular las ventas por vendedor:', error);
    res.status(500).json({ message: 'Error al calcular las ventas por vendedor' });
  }
};



// Obtain all sales by sellerID

export const getSalesBySeller = async (req, res) => {
  try {
    const sales = await Sale.findAll({ where: { sellerID: req.params.sellerID } });

    if (sales.length == 0) {
      return res.status(404).json({message: 'No sales found'})
    }

    res.status(200).json(sales);
  } catch (error) {
    res.status(400).json({message: 'Error getting sales'});
  }
}


// Obtain count of sales by car type

export const countSoldCarsByType = async (req, res) => {
  try {
    const carCountByType = await Car.findAll({
      attributes: [
        ['type', 'name'],
        [sequelize.fn('count', sequelize.col('Sale.carID')), 'value'], // Contar la cantidad de carros
      ],
      include: [
        {
          model: Sale,
          where: { status: 'sold' }, // Filtrar solo las ventas con estado 'sold'
          required: true, // Forzar una relación interna (INNER JOIN)
        },
      ],
      group: ['type'], // Agrupar por tipo de carro
    });

    // Mapear los resultados para cambiar los nombres de los campos
    const renamedResults = carCountByType.map((result) => ({
      name: result.dataValues.name,
      value: result.dataValues.value,
    }));

    res.status(200).json(renamedResults);
  } catch (error) {
    console.error('Error al contar carros vendidos por tipo:', error);
    res.status(500).json({ message: 'Error al contar carros vendidos por tipo' });
  }
};


// Obtain the sum of sales of a seller by sellerID

// Controlador para obtener la suma de ventas de un vendedor por ID
export const getSalesTotalBySeller = async (req, res) => {
  const { sellerID } = req.params;

  try {
    const salesTotal = await Sale.sum('totalPrice', {
      where: { sellerID: sellerID }
    });

    if (!salesTotal) {
      return res.status(404).json({ message: 'No sales found for the specified seller.' });
    }

    res.status(200).json({ totalSales: salesTotal });
  } catch (error) {
    console.error('Error al obtener la suma de ventas por vendedor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};