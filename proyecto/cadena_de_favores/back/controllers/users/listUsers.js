const { getConnection } = require("../../db");

async function listUsers(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { direction } = req.query;

    // Proceso la dirección de orden
    const orderDirection =
      (direction && direction.toLowerCase()) === "desc" ? "DESC" : "ASC";

    const [result] = await connection.query(
      `
      SELECT id, registrationDate, name, surname, email, foto
      FROM users
      ORDER BY registrationDate ${orderDirection}
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
