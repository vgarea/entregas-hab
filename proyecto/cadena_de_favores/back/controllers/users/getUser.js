const { getConnection } = require("../../db");

async function getUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    /* const [result] = await connection.query(
      `
      SELECT id, registrationDate, email, role, name, surname, alias, foto
      FROM users
      WHERE id=?
    `,
      [id]
    ); */
    // con esto tengo todos los datos, pero no tengo la media de los 2 ratings
    // tengo que añadirles las medias
    // (SELECT AVG(F.rating_asker) WHERE U.id = F.user_asker_id) AS voteAskerAverage,
    // (SELECT AVG(F.rating_maker) WHERE U.id = F.user_maker_id) AS voteMakerAverage
    const [result] = await connection.query(
      `
        SELECT U.id, U.registrationDate, U.email, U.role, U.name, U.surname, U.alias, U.foto, UAVG.voteAskerAverage, UAVG.voteMakerAverage
        FROM favour_chain.users U LEFT JOIN

        (SELECT MA.user_asker_id, MA.voteAskerAverage, MM.voteMakerAverage
          FROM (
            SELECT AVG(F.rating_asker) AS voteAskerAverage, F.user_asker_id
            FROM favour_chain.favours F
            GROUP BY user_asker_id
          ) MA
          LEFT JOIN (
            SELECT AVG(F.rating_maker) AS voteMakerAverage, F.user_maker_id
            FROM favour_chain.favours F
            GROUP BY user_maker_id
          ) MM
          ON MA.user_asker_id = MM.user_maker_id) AS UAVG
            
        ON U.id = UAVG.user_asker_id
        WHERE U.id = ?
        `,
        [id]
      );

    if (result.length === 0) {
      const error = new Error(`El usuario con id ${id} no existe`);
      error.httpStatus = 404;
      throw error;
    }

    const [userData] = result;

    const responseData = {
      registrationDate: userData.registrationDate,
      name: userData.name,
      surname: userData.surname,
      role: userData.role,
      alias: userData.alias,
      foto: userData.foto,
      voteAskerAverage: userData.voteAskerAverage,
      voteMakerAverage: userData.voteMakerAverage,
    };

    if (userData.id === req.auth.id || req.auth.role === "admin") {
      responseData.email = userData.email;
      responseData.role = userData.role;
    }

    res.send({
      status: "ok",
      data: responseData,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getUser;
