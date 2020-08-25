const { getConnection } = require("../../db");

async function listUsers(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { direction } = req.query;

    // Proceso la dirección de orden
    const orderDirection =
      (direction && direction.toLowerCase()) === "asc" ? "ASC" : "DESC";

    /* const [result] = await connection.query(
      `
      SELECT id, registrationDate, name, surname, email, foto
      FROM users
      ORDER BY registrationDate ${orderDirection}
      `
    ); */

    const [result] = await connection.query(
      `
        SELECT U.id, U.registrationDate, U.email, U.role, U.name, U.surname, U.alias, U.foto, UAVG.voteAskerAverage, UAVG.voteMakerAverage
        FROM favour_chain.users U LEFT JOIN

        (SELECT MA.user_asker_id, MA.voteAskerAverage, MM.voteMakerAverage
          FROM (
            SELECT ROUND(AVG(F.rating_asker),2) AS voteAskerAverage, F.user_asker_id
            FROM favour_chain.favours F
            GROUP BY user_asker_id
          ) MA
          LEFT JOIN (
            SELECT ROUND(AVG(F.rating_maker),2) AS voteMakerAverage, F.user_maker_id
            FROM favour_chain.favours F
            GROUP BY user_maker_id
          ) MM
          ON MA.user_asker_id = MM.user_maker_id) AS UAVG
            
        ON U.id = UAVG.user_asker_id
        ORDER BY UAVG.voteMakerAverage ${orderDirection}
        `
    );

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

module.exports = listUsers;
