const { Videogame, Genre } = require('../db_conection')
const axios=require('axios')
const {API_KEY} = process.env;

const getVideogameById=async(req, res)=>{
  const { idVideogame }=req.params
  const validUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  if (validUuid.test(idVideogame)) {
    try {
      const videogame=await Videogame.findByPk(idVideogame,{
        include: [{
          model: Genre,
          through: { attributes: [] }, //* Esto excluye los atributos de la tabla intermedia
        }],
      })
      
      const BD_Format={
        id: videogame.id,
        name: videogame.name,
        background_image: videogame.background_image,
        platforms: videogame.platforms,
        description_raw: videogame.description_raw,
        genres: videogame.Genres.map(genre=>genre.name).join(', '),
        rating: videogame.rating,
        isFromDatabase: true,
      }
      
      res.json(BD_Format)
  
    } catch (error) {
      res.status(500).json({ message: error.message })
    }


  } else if (Number(idVideogame)) {
    try {
      const {data}=await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)

      const API_Format={
        id: data.id,
        name: data.name,
        background_image: data.background_image,
        platforms: data.platforms.map((platform)=>platform.platform.name).join(', '),
        description_raw: data.description_raw,
        genres: data.genres.map(genre=>genre.name).join(', '),
        rating: data.rating,
      }
      res.json(API_Format)

    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } else {
    res.status(500).json({error: "Ha ocurrido un error"})
  }  

}

module.exports={
  getVideogameById
}