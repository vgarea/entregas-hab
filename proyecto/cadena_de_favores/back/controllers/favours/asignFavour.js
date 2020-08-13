const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");

//const { editEntrySchema } = require("../../validators/diaryValidators");

async function asignFavour(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    //await editEntrySchema.validateAsync(req.body);

    // Sacamos los datos
    const { maker_id } = req.body;
    const { favour_id } = req.params;

    // Seleccionar datos actuales de la entrada
    const [current] = await connection.query(
    `
        SELECT F.id
        FROM favours F
        WHERE F.id = ?
    `,
        [favour_id]
    );

    const [currentEntry] = current;
        console.log(`'${maker_id}'` !== req.auth.id);
    if (maker_id !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("No tienes permisos para editar esta entrada", 403);
    }

    // Ejecutar la query de edición de la entrada
    await connection.query(
      `
      UPDATE favours F
      SET F.status=?, F.user_maker_id=? F.modification_date=UTC_TIMESTAMP
      WHERE id=?
    `,
      ['asignado', maker_id, favour_id]
    );

    // Devolver resultados
    res.send({
      status: "ok",
      data: {
        favour_id,
        maker_id,
        status,
        modification_date,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = asignFavour;
