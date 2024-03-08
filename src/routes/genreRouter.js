const {Router} = require("express")
const genreRouter=Router()
const {getGenres}=require('../controllers/genres')

genreRouter.get('/', getGenres)

module.exports={
   genreRouter,
}