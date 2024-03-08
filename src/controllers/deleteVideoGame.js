const { Videogame } = require("../db_conection");

const deleteVideogame = async (req, res) => {
 const { idVideogame } = req.params;

 try {
  const deletedVideogame = await Videogame.destroy({
   where: { id: idVideogame },
  });

  if (!deletedVideogame) {
   return res
    .status(404)
    .json({ message: "No se encontró el videojuego con el ID proporcionado" });
  }

  res.json({ message: "Videojuego eliminado exitosamente" });
 } catch (error) {
  console.error(error);
  res
   .status(500)
   .json({ message: "Hubo un error al intentar eliminar el videojuego" });
 }
};

module.exports = { deleteVideogame };