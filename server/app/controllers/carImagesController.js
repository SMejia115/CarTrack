import carImage from '../models/carImagesModel.js';
import cloudinary from '../controllers/cloudinary.js';
import Car from '../models/carModel.js';
import fs from 'fs';

// Create a new carImage (productImages/add/:carID)
export const createCarImage =  async (req, res) => {
  try {
    const carID = parseInt(req.params.carID, 10);
    const  imageFile  = req.file;

    if (!imageFile) {
      return res.status(400).json({message: 'No image file provided ' + imageFile});
    }

    const tempFilePath = `./uploads/${imageFile.originalname}`;
    fs.writeFileSync(tempFilePath, imageFile.buffer);
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: 'CarTrack/Imgs',
      transformation: [{width: 800, height: 600, crop: 'fill'}]
    });

    fs.unlinkSync(tempFilePath);

		// res.send(result);
    const ImageURL = result.secure_url;
		
		// res.send('result -> '+ result);

    await carImage.create({
			carID,
			ImageURL,
    });

    res.status(201).json({message: 'Image created successfully'});

  } catch (error) {
    res.status(400).json({message: 'Error creating image' + error});
    console.log('Error creating product image:', error);
		res.status(500).json({ message: 'Error creating product image' });
		res.end();
  } 
};

// Create a new carImage (productImages/add/:licensePlate) by licensePlate

export const createCarImageByLicensePlate =  async (req, res) => {
  try {
    const licensePlate = req.params.licensePlate;
    const car = await Car.findAll({ where: { licensePlate: licensePlate} });
    const carID = car[0].carID;
    const  imageFile  = req.file;

    if (!imageFile) {
      return res.status(400).json({message: 'No image file provided ' + imageFile});
    }

    const tempFilePath = `./uploads/${imageFile.originalname}`;
    fs.writeFileSync(tempFilePath, imageFile.buffer);
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: 'CarTrack/Imgs',
      transformation: [{width: 800, height: 600, crop: 'fill'}]
    });

    fs.unlinkSync(tempFilePath);

    // res.send(result);
    const ImageURL = result.secure_url;
    
    // res.send('result -> '+ result);

    await carImage.create({
      carID,
      ImageURL,
    });

    res.status(201).json({message: 'Image created successfully'});

  } catch (error) {
    res.status(400).json({message: 'Error creating image' + error});
    console.log('Error creating product image:', error);
    res.status(500).json({ message: 'Error creating product image' });
    res.end();
  } 
}

// Obtain all carImages

export const getCarImages = async (req, res) => {
  try {
    const carImages = await carImage.findAll();

    if (carImages.length == 0) {
      return res.status(404).json({message: 'No carImages found'})
    }

    res.status(200).json(carImages);
  } catch (error) {
    res.status(400).json({message: 'Error getting carImages'});
  }
}