const { getConnection } = require("../../db");
//const { randomString, sendMail, generateError } = require("../../helpers");
//const { newUserSchema } = require("../../validators/userValidators");

async function listFavoursFind(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    //await newUserSchema.validateAsync(req.body);
        
    // Sacamos las posibles opciones del body:
    //  search: para listar solo las entradas que contengan su valor en location, category o deadline
    //  locationFavour: para buscar en location
    //  categoryFavour: para buscar en category
    //  dataFavour: para buscar en fecha
    //  order: para ordernar el listado por voteAverage, place o date
    //  direction: para la dirección de la ordenación desc o asc
    const { search, locationFavour, categoryFavour, dataFavour, order, direction } = req.body;

    console.log(order +' hola '+ search);

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
    
    // Ejecuto la query en base a si existe querystring de search / location, category, deadline

    let queryResults;
    
    if (order) {
      queryResults = await connection.query(
      `
        SELECT F.id, F.creation_date, F.deadline, F.location, F.description, F.category, F.status, F.reason, F.user_asker_id, F.user_maker_id,
        A.name AS user_asker_name, A.surname AS user_asker_surname,
        M.name AS user_maker_name, M.surname AS user_maker_surname
        FROM favours F
          INNER JOIN users A ON F.user_asker_id = A.id
          LEFT JOIN users M ON F.user_maker_id = M.id
          WHERE F.location LIKE ? OR F.category LIKE ? OR F.deadline LIKE ?
        ORDER BY ${orderBy} ${orderDirection}
      `,
        [`%${search}%`, `%${search}%`, `%${search}%`]
      );
    } else if (search) {
      queryResults = await connection.query(
      `
        SELECT F.id, F.creation_date, F.deadline, F.location, F.description, F.category, F.status, F.reason, F.user_asker_id, F.user_maker_id,
        A.name AS user_asker_name, A.surname AS user_asker_surname,
        M.name AS user_maker_name, M.surname AS user_maker_surname
        FROM favours F
          INNER JOIN users A ON F.user_asker_id = A.id
          LEFT JOIN users M ON F.user_maker_id = M.id
          WHERE F.location LIKE ? OR F.category LIKE ? OR F.deadline LIKE ?
        ORDER BY location DESC
      `,
        [`%${search}%`, `%${search}%`, `%${search}%`]
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

module.exports = listFavoursFind;