import Client from '../models/clientModel.js';



//Obtain all clients

export const getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();

    if (clients.length == 0) {
      return res.status(404).json({message: 'No clients found'})
    }

    res.status(200).json(clients);
  } catch (error) {
    res.status(400).json({message: 'Error getting clients'});
  }
};


//Obtain client by ID

export const getClientByID = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.clientID);

    if (!client) {
      return res.status(404).json({message: 'Client not found'})
    }
    
    res.status(200).json(client);

  } catch (error) {
    res.status(400).json({ message: 'Error retrieving client by id', data: {} });
  }
};

//Obtain client by identification number

export const getClientByIdentificationNumber = async (req, res) => {
  try {
    const client = await Client.findOne({ where: { identificationNumber: req.params.identificationNumber } });
    
    if (!client) {
      return res.status(404).json({message: 'Client not found'})
    }

    res.status(200).json(client);

  } catch (error) {
    res.status(400).json({ message: 'Error retrieving client by identification number', data: {} });
  }
};


// Create a new client 

export const createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json({message: 'Client created successfully'});
  } catch (error) {
    console.log('Error creating client:', error);
    res.status(500).json({ message: 'Error creating client' });
    res.end();
  }
};