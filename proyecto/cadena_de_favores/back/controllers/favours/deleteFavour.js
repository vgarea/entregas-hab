const { getConnection } = require("../../db");
const { deleteUpload, generateError } = require("../../helpers");

async function deleteFavour(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    // Comprobar que existe esa id y si no dar error404
    const [current] = await connection.query(
      `
      SELECT user_id
      FROM favours
      WHERE id=?
    `,
      [id]
    );

    if (current[0].user_id !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("No tienes permisos para borrar este favor", 403);
    }

    // Si la entrada tiene imagen asociada borrarla
    /* if (current[0].image) {
      await deleteUpload(current[0].image);
    } */

    // Borrar la entrada de la tabla
    await connection.query(
      `
      DELETE FROM favours
      WHERE id=?
    `,
      [id]
    );

    res.send({
      status: "ok",
      message: `El favor ${id} de la tabla favours fue borrada`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = deleteFavour;
