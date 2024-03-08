const { Genre } = require('../db_conection')
const axios = require('axios')
const {APIKEY} = process.env;

const getGenres=async(req, res)=>{
  try{
        
    const response=await axios.get(`https://api.rawg.io/api/genres${APIKEY}`)
    
    const genresApi = response.data.results.map((genre, index)=>{
      return {
        id:index+1,
        name:genre.name,
      }
    })
    
    //?Solo lo voy a necesitar una vez para cargar los datos de los genres
    // await Genre.bulkCreate(genresApi) 
    
    const genres=await Genre.findAll()

    res.json(genres)

  }catch(error){
    res.status(500).json({ message: error.message })
  }
}

module.exports={
  getGenres,
}