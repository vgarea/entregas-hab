const { getConnection } = require("../../db");

async function listFavours(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    // Sacamos las posibles opciones del querystring:
    //  search: para listar solo las entradas que contengan su valor en place o description
    //  order: para ordernar el listado por voteAverage, place o date
    //  direction: para la dirección de la ordenación desc o asc
    const { search, order, direction } = req.query;

    // Proceso la dirección de orden
    const orderDirection =
      (direction && direction.toLowerCase()) === "desc" ? "DESC" : "ASC";

    // Proceso el campo de orden
    let orderBy;
    switch (order) {
      case "location":
        orderBy = "location";
        break;
      default:
        orderBy = "creation_date";
    }

    // Ejecuto la query en base a si existe querystring de search o no
    let queryResults;
    if (search) {
      queryResults = await connection.query(
        `
        SELECT F.id, F.creation_date, F.deadline, F.location, F.description, F.category, F.status, F.reason, F.user_asker_id, F.user_maker_id,
        A.name AS user_asker_name, A.surname AS user_asker_surname,
        M.name AS user_maker_name, M.surname AS user_maker_surname
        FROM favours F
          INNER JOIN users A ON F.user_asker_id = A.id
          LEFT JOIN users M ON F.user_maker_id = M.id
        WHERE location LIKE ? OR description LIKE ?
        ORDER BY ${orderBy} ${orderDirection}
        `,
        [`%${search}%`, `%${search}%`]
        );

    } else {
      queryResults = await connection.query(
        `
        SELECT F.id, F.creation_date, F.deadline, F.location, F.description, F.category, F.status, F.reason, F.user_asker_id, F.user_maker_id,
        A.name AS user_asker_name, A.surname AS user_asker_surname,
        M.name AS user_maker_name, M.surname AS user_maker_surname
        FROM favours F
          INNER JOIN users A ON F.user_asker_id = A.id
          LEFT JOIN users M ON F.user_maker_id = M.id
        ORDER BY ${orderBy} ${orderDirection}`
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

module.exports = listFavours;