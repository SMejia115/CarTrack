import Car from '../models/carModel.js';
import CarImage from '../models/carImagesModel.js';

// Obtain all cars

export const getCars = async (req, res) => {
  try {
    const cars = await Car.findAll();

    if (cars.length == 0) {
      return res.status(404).json({message: 'No cars found'})
    }

    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json({message: 'Error getting cars'});
  }
}

// Obtain car by license plate

export const getCarByLicensePlate = async (req, res) => {
  try {
    const car = await Car.findAll({ where: { licensePlate: req.params.licensePlate } });

    if (car.length == 0) {
      return res.status(404).json({message: 'Car not found'})
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({message: 'Error getting car'});
  }
}

// Obtain car by ID

export const getCarByID = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.carID);

    if (!car) {
      return res.status(404).json({message: 'Car not found'})
    }
    
    res.status(200).json(car);

  } catch (error) {
    res.status(400).json({ message: 'Error retrieving car by id', data: {} });
  }
}

// Obtain available cars

export const getAvailableCars = async (req, res) => {
  try {
    const cars = await Car.findAll({ where: { status: 'available' } });

    if (cars.length == 0) {
      return res.status(404).json({message: 'No cars found'})
    }

    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json({message: 'Error getting cars'});
  }
}

// Obtain sold cars

export const getSoldCars = async (req, res) => {
  try {
    const cars = await Car.findAll({ where: { status: 'sold' } });

    if (cars.length == 0) {
      return res.status(404).json({message: 'No cars found'})
    }

    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json({message: 'Error getting cars'});
  }
}

// Create a new car
// export const createCar = async (req, res) => {
//   try {
//     const car = req.body;
//     await Car.create(car);
//     res.status(201).json({message: 'Car created successfully'});

//   } catch (error) {
//     res.status(400).json({message: 'Error creating car'+ error});
//   }
// }

// Create a new car (cars/add) and set car status to available

export const createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);

    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({ message: 'Error creating car', error });
    console.log('Error creating car:', error);
  }
}


// Obtain all available cars with their corresponding images

export const getAvailableCarsWithImages = async (req, res) => {
  try{
    const cars = await Car.findAll({ where: { status: 'available' } });

    const carsWithImages = await Promise.all(
      cars.map(async car => {
        const carImages = await CarImage.findAll({ where: { carID: car.carID } });
        if (carImages.length == 0) {
          return { ...car.dataValues, carImages: [] };
        }
        return { ...car.dataValues, carImages };
      })
    );
    if (carsWithImages.length == 0) {
      return res.status(404).json({message: 'No cars found'})
    }
    res.status(200).json(carsWithImages);
  } catch (error) {
    console.log(error);
    res.status(400).json({message: 'Error getting cars'});
  }
}


// Obtain available cars with id whit images

export const getCarsWithImagesbyID = async (req, res) => {
  try {
    const carID = req.params.carID;
    const car = await Car.findByPk(carID);
    const carImages = await CarImage.findAll({ where: { carID } });

    if (!car) {
      return res.status(404).json({message: 'Car not found'})
    }
    res.status(200).json({ car, carImages});
  } catch (error) {
    res.status(400).json({message: 'Error getting cars'});
  }
}

