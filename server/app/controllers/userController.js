import express from 'express';
import User from '../models/userModel.js';


//Obtain all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (users.length == 0) {
      return res.status(404).json({message: 'No users found'})
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({message: 'Error getting users'});
  }
};


//Obtain user by ID
export const getUserByID = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userID);

    if (!user) {
      return res.status(404).json({message: 'User not found'})
    }
    
    res.status(200).json(user);

  } catch (error) {
    res.status(400).json({ message: 'Error retrieving user by id', data: {} });
  }
};


//Obtain user by username
export const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ where: { userName: req.params.username } });
    
    if (!user) {
      return res.status(404).json({message: 'User not found'})
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(400).json({ message: 'Error retrieving user by username', data: {} });
  }
};


//Create a new user
export const createUser = async (req, res) => {
  const user = req.body;
  const userName = user.userName;
  try {
    // Verifica si el nombre de usuario ya existe en la base de datos
    const existingUser = await User.findOne({ where: { userName } });
    if (existingUser) {
      return res.status(409).json({ message: 'El nombre de usuario ya existe' });
    }

    // Si el nombre de usuario no existe, crea el nuevo usuario
    const newUser = await User.create(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};