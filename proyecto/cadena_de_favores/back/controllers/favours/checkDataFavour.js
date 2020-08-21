const { getConnection } = require("../../db");
const { formatDateToDB } = require("../../helpers");

async function checkDataFavour(req, res, next) {
  let connection;
  let hoy = new Date();

  try {
    connection = await getConnection();

    // Seleccionamos el estado y las deadline de todos los favores
    const [current] = await connection.query(
        `
        SELECT id, status, deadline
        FROM favours
        `
    );

    const [currentEntry] = current;
    
    // Meter en una variable los id's de los favores que cumplan la condición del if
    // Actualizar el estado a cancelado
    for(let currentValue of current){
      // Comprobar el estado y la fecha del favor
      if (formatDateToDB(currentValue.deadline) <= formatDateToDB(hoy) && currentValue.status === 'pendiente'){
        
        // Ejecutar la query de edición de la entrada
        await connection.query(
          `
          UPDATE favours SET status=?, modification_date=UTC_TIMESTAMP
          WHERE id=?
        `,
          ['cancelado', currentValue.id]
        )
      }
    }
    console.log('Status OK')
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = checkDataFavour;
