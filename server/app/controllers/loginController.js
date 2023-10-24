import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


// const loginController = async (req, res) => {
//   return res.send(
//     jwt.sign({ test: "payload" }, "secretKey", { expiresIn: "1h" })//Dentro de la función loginController, se está utilizando jwt.sign() para crear un nuevo token JWT. El método sign toma tres argumentos:
//   );
// };


const loginController = async (req, res) => {

  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ where: { userName, password} });

    if (user) {
      const token = jwt.sign({user}, "secretKey", {
        expiresIn: '3h'
      });
      res.send({token});
    } else {
      console.log('wrong user');
      res.status(400).json({message: 'Error getting users'});
    }
  } catch (error) {
    console.log(error);
  }
};





export default loginController;