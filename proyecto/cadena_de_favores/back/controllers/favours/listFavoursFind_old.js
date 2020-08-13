const { getConnection } = require("../../db");
//const { randomString, sendMail, generateError } = require("../../helpers");
//const { newUserSchema } = require("../../validators/userValidators");

async function favoursFind(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    //await newUserSchema.validateAsync(req.body);

    const { search, locationFavour, categoryFavour, dataFavour } = req.body;

    // hacemos la búsqueda en la base de datos y obtenemos resultados
    let queryResults;
    
    if(search){
        queryResults = await connection.query(
        `
            SELECT F.id, F.creation_date, F.deadline, F.location, F.description, F.category, F.status, F.reason, F.user_asker_id, F.user_maker_id
            FROM favours F
            WHERE F.location LIKE ? OR F.category LIKE ? OR F.deadline LIKE ?
            ORDER BY location DESC
        `,
            [`%${search}%`, `%${search}%`, `%${search}%`]
        );
    } else {
        queryResults = await connection.query(
        `
            SELECT F.id, F.creation_date, F.deadline, F.location, F.description, F.category, F.status, F.reason, F.user_asker_id, F.user_maker_id
            FROM favours F
            WHERE F.location LIKE ? AND F.category LIKE ? AND F.deadline LIKE ?
            ORDER BY location DESC
        `,
            [`%${locationFavour}%`, `%${categoryFavour}%`, `%${dataFavour}%`]
        );
    }

    // Extraigo los resultados reales del resultado de la query
    const [result] = queryResults;
    
    // Mando la respuesta
    res.send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = favoursFind;
