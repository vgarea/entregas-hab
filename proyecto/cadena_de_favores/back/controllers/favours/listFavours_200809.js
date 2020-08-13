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
      case "voteAverage":
        orderBy = "voteAverage";
        break;
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
        SELECT id, favours.creation_date, favours.location, favours.description, favours.category, favours.user_doer_id,
        (SELECT AVG(vote) FROM favour_votes WHERE entry_id=favours.id) AS voteAverage
        FROM favours 
        WHERE location LIKE ? OR description LIKE ?
        ORDER BY ${orderBy} ${orderDirection}
        `,
        [`%${search}%`, `%${search}%`]
      );
    } else {
      queryResults = await connection.query(
        `
        SELECT favours.id, favours.creation_date, favours.location, favours.description, favours.category, favours.user_doer_id,
        (SELECT AVG(vote) FROM favour_votes WHERE entry_id=favours.id) AS voteAverage
        FROM favours 
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
