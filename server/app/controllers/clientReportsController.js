import ClientReports from '../models/clientReportsModel.js';
import cloudinary from '../controllers/cloudinary.js';
import Client from '../models/clientModel.js';
import fs from 'fs';


// Obtain all clientReports

export const getClientReports = async (req, res) => {
  try {
    const clientReports = await ClientReports.findAll();

    if (clientReports.length == 0) {
      return res.status(404).json({message: 'No clientReports found'})
    }

    res.status(200).json(clientReports);
  } catch (error) {
    res.status(400).json({message: 'Error getting clientReports'});
  }
}

//  Obtain clientReport by ID

export const getClientReportByID = async (req, res) => {
  try {
    const clientReport = await ClientReports.findByPk(req.params.clientReportID);

    if (!clientReport) {
      return res.status(404).json({message: 'ClientReport not found'})
    }
    
    res.status(200).json(clientReport);

  } catch (error) {
    res.status(400).json({ message: 'Error retrieving clientReport by id', data: {} });
  }
}


// Create a new clientReport (clientReports/add/:clientID)

export const createClientReport =  async (req, res) => {
  try {
    const identificationNumber = req.params.identificationNumber;
    console.log('identificationNumber -> ' + identificationNumber);
    const client = await Client.findAll({ where: { identificationNumber: identificationNumber} });
    const clientID = client[0].clientID;
    const reportFile  = req.file;

    if (!reportFile) {
      return res.status(400).json({message: 'No file provided ' + reportFile});
    }

    const tempFilePath = `./uploads/${reportFile.originalname}`;
    fs.writeFileSync(tempFilePath, reportFile.buffer);
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: 'CarTrack/Reports',
      transformation: [{width: 800, height: 600, crop: 'fill'}]
    });

    fs.unlinkSync(tempFilePath);

    // res.send(result);
    const reportDocURL = result.secure_url;
    
    // res.send('result -> '+ result);

    await ClientReports.create({
      clientID,
      reportDocURL,
    });

    res.status(201).json({message: 'Report created successfully'});

  } catch (error) {
    res.status(400).json({message: 'Error creating report' + error});
    console.log('Error creating product image:', error);
    res.status(500).json({ message: 'Error creating product image' });
    res.end();
  } 
}


// Obtain clientReport by clientID
