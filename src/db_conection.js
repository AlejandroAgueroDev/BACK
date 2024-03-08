require('dotenv').config();
const VideogameModel=require('./models/Videogame')
const GenreModel=require('./models/Genre')
const { Sequelize } = require('sequelize');

const {
  DB_USER, DB_PASSWORD, DB_HOST, PORT, BDD
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT}/${BDD}`, {
  logging: false, 
  native: false,
});

//*Ejecuto las tablas pasandoles el sequelize por parametro
VideogameModel(sequelize)
GenreModel(sequelize)


//*Me traigo los models de las tablas
const { Videogame, Genre } = sequelize.models;


//*Establezco relacion de tablas creando la tabla intermedia
Videogame.belongsToMany(Genre, { through: 'VideogameGenre' });
Genre.belongsToMany(Videogame, { through: 'VideogameGenre' });


module.exports = {
  ...sequelize.models, 
  conn: sequelize,     
};
