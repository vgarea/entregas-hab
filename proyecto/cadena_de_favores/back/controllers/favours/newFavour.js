const { getConnection } = require("../../db");
//const { processAndSaveImage, generateError } = require("../../helpers");
const { formatDateToDB, generateError } = require("../../helpers");

const { newFavourSchema } = require("../../validators/favourValidators");

async function newFavour(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    await newFavourSchema.validateAsync(req.body);

    // Sacar de req.body los datos que necesitio
    const { location, description, category, reason, status, deadline } = req.body;

    // Comprobar que la fecha sea correcta.
    if (deadline <= formatDateToDB(new Date()+7200)){
      throw generateError("La fecha debe ser superior a la fecha actual", 409)
    }

/* 
    // Comprobar que no no existe una entrada con el mismo place
    const [existingEntry] = await connection.query(
      `
      SELECT id 
      FROM favours
      WHERE description=?
    `,
      [description]
    );
 
    if (existingEntry.length > 0) {
      throw generateError("Ya existe una entrada en la base de datos con ese campo place", 409);
    }
*/
/* 
    let savedImageFileName;

    // Procesar la imagen si está en el body
    if (req.files && req.files.image) {
      try {
        // Procesar y guardar imagen
        savedImageFileName = await processAndSaveImage(req.files.image);
      } catch (error) {
        throw generateError("No se pudo procesar la imagen. Inténtalo de nuevo", 400);
      }
    }
 */
    // Ejecutar la query
    const [result] = await connection.query(
      `
      INSERT INTO favours(creation_date, location, description, category, reason, status, deadline, modification_date, user_asker_id)
      VALUES(UTC_TIMESTAMP,?,?,?,?,?,?,UTC_TIMESTAMP,?)
      `,
      [location, description, category, reason, status, deadline, req.auth.id]
    );

    // Devolver el resultado

    res.send({
      status: "ok",
      data: {
        id: result.id,
        location,
        description,
        category,
        reason,
        status,
        deadline
        //image: savedImageFileName,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newFavour;
