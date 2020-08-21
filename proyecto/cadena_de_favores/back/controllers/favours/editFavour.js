const { getConnection } = require("../../db");
const {
  formatDateToDB,
  sendMail,
  generateError,
} = require("../../helpers");

const { editFavourSchema } = require("../../validators/favourValidators");

async function editFavour(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    await editFavourSchema.validateAsync(req.body);

    // Sacamos los datos
    const { location, description, category, reason, status, deadline } = req.body;
    const { id } = req.params;

    // Seleccionar datos actuales de la entrada
    const [current] = await connection.query(
      `
    SELECT id, location, description, category, reason, status, deadline, user_asker_id
    FROM favours
    WHERE id=?
  `,
      [id]
    );

    const [currentEntry] = current;

    if (currentEntry.user_asker_id !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("No tienes permisos para editar esta entrada", 403);
    }

    // Comprobar el estado del favor
    if (status === 'finalizado'){
      // Recuperamos los datos del usuario asker y maker
      const [result] = await connection.query(
        `
        SELECT F.user_asker_id, F.user_maker_id,
        A.name AS user_asker_name, A.surname AS user_asker_surname, A.email AS user_asker_email,
        M.name AS user_maker_name, M.surname AS user_maker_surname, M.email AS user_maker_email
        FROM favours F
          INNER JOIN users A ON F.user_asker_id = A.id
          LEFT JOIN users M ON F.user_maker_id = M.id
        WHERE F.id=?
      `,
        [id]
      );
      const [currentResult] = result;
        console.log(id + ' :: ' + currentResult.user_asker_email+' :: '+ currentResult.user_maker_email);

      // Enviar aviso al asker
      try {
        await sendMail({
          email: currentResult.user_asker_email,
          title: 'Puedes votar',
          content: `
            Accede a {URL} para votar.
          `,
        });
      } catch (error) {
        throw generateError("Error de envío de mail al ASKER", 500);
      }

      // Enviar aviso al maker
      try {
        await sendMail({
          email: currentResult.user_maker_email,
          title: 'Puedes votar',
          content: `
            Accede a {URL} para votar
          `,
        });
      } catch (error) {
        throw generateError("Error de envío de mail al MAKER", 500);
      }
    }

    // Ejecutar la query de edición de la entrada
    await connection.query(
      `
      UPDATE favours SET location=?, description=?, category=?, reason=?, status=?, deadline=?, modification_date=UTC_TIMESTAMP
      WHERE id=?
    `,
      [location, description, category, reason, status, formatDateToDB(deadline), id]
    );

    // Devolver resultados
    res.send({
      status: "ok",
      data: {
        id,
        location,
        description,
        category,
        reason,
        status,
        deadline,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = editFavour;
