const router = require("express").Router()
const { videogamesRouter }=require('./videogamesRouter')
const { genreRouter }=require('./genreRouter')

router.use("/videogames", videogamesRouter);

router.use("/genres", genreRouter);

module.exports = router;