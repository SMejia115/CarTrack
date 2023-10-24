import Sequelize from 'sequelize';

// Conexión con la base de datos
const sequelize = new Sequelize ('cartrack', 'root', '123456789', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});

// Autenticación de la conexión con la base de datos
sequelize.authenticate()
    .then(() => {
        console.log("CONEXIÓN CON LA DB OK");
    })
    .catch(err => {
        console.log("El error en la conexión es: ", +err);
    });

export default sequelize;