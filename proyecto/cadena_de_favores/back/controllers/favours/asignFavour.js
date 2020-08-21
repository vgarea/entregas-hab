const { getConnection } = require("../../db");
const {
  sendMail,
  generateError,
} = require("../../helpers");

//const { editEntrySchema } = require("../../validators/diaryValidators");

async function asignFavour(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    //await editEntrySchema.validateAsync(req.body);

    // Sacamos los datos
    const { id } = req.params; //Importante: esto va a ser un string
    const { favour_status } = req.body;

    // Obtenemos los datos que nos hacen falta
    const [userResult] = await connection.query(
      `
      SELECT user_asker_id
      FROM favours 
      WHERE id=?
    `,
      [id]
    );
    
    // Comprobar que el usuario que hace la petición no es el que pide el favor
    if (userResult[0].user_asker_id === req.auth.id) {
      throw generateError("No puedes aceptar un reto que tú has propuesto", 403);
    }

    // Ejecutar la query de edición de la entrada
    await connection.query(
      `
      UPDATE favours SET status=?, user_maker_id=?, modification_date=UTC_TIMESTAMP
      WHERE id=?
    `,
      [favour_status, req.auth.id, id]
    );

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
    //console.log(id + ' :: ' + result[0].user_asker_id+' !== '+ req.auth.id);
    console.log(id + ' :: ' + result[0].user_asker_email+' :: '+ result[0].user_maker_email);

    // Enviar aviso al asker
    try {
      await sendMail({
        email: result[0].user_asker_email,
        title: 'Se ha aceptado tu petición',
        content: `
          Ponte en contacto con ${result[0].user_maker_name} ${result[0].user_maker_surname} a través de su correo:
          ${result[0].user_maker_email}
        `,
      });
    } catch (error) {
      throw generateError("Error de envío de mail al ASKER", 500);
    }

    // Enviar aviso al maker
    try {
      await sendMail({
        email: result[0].user_maker_email,
        title: 'Has aceptado su petición',
        content: `
          Ponte en contacto con ${result[0].user_asker_name} ${result[0].user_asker_surname} a través de su correo:
          ${result[0].user_asker_email}
        `,
      });
    } catch (error) {
      throw generateError("Error de envío de mail al MAKER", 500);
    }

    // Devolver resultados
    res.send({
      status: "ok",
      data: {
        id,
        favour_status
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = asignFavour;
