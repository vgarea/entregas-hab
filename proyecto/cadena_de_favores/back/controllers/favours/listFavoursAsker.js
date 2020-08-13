const { getConnection } = require("../../db");

async function listFavoursAsker(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Sacamos los datos
    const { id } = req.params;

    // Ejecuto la query en base a si existe querystring de search o no
    let queryResults;
    queryResults = await connection.query(
    `
        SELECT F.id, F.creation_date, F.deadline, F.location, F.description, F.category, F.status, F.reason, F.user_asker_id, F.user_maker_id,
        A.name AS user_asker_name, A.surname AS user_asker_surname,
        M.name AS user_maker_name, M.surname AS user_maker_surname
        FROM favours F
          INNER JOIN users A ON F.user_asker_id = A.id
          LEFT JOIN users M ON F.user_maker_id = M.id
        WHERE F.user_asker_id=?
        `,
        [id]
        );

        
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

module.exports = listFavoursAsker;