const { getConnection } = require("../../db");

const { voteFavourSchema } = require("../../validators/favourValidators");
const { generateError } = require("../../helpers");

async function voteFavour(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    
    await voteFavourSchema.validateAsync( req.body );
    
    const { vote } = req.body;
    const { id } = req.params;

    // Comprobar que la entrada existe y si no dar un 404
    const [entry] = await connection.query(
      `
      SELECT id, user_maker_id, user_asker_id
      FROM favours
      WHERE id=?
    `,
      [id]
    );
    
    // Comprobar quién hace la votación el asker o el maker
    let userVote;
    switch (req.auth.id) {
      case entry[0].user_maker_id:
        userVote = 'asker';
        break;
      case entry[0].user_asker_id:
        userVote = 'maker';
        break;
      default:
        throw generateError(`Ha habido un error y no puedes hacer la votación con este usuario`,403);
    }
    //console.log(userVote);
    
    // Comprobar que no hay voto
    let queryResults;
    if(userVote === 'asker'){
      queryResults = await connection.query(
        `
        SELECT rating_asker
        FROM favours
        WHERE id=?
      `,
        [id]
      );
    } else if (userVote === 'maker') {
      queryResults = await connection.query(
        `
        SELECT rating_maker
        FROM favours
        WHERE id=?
      `,
        [id]
      );
    }

    const [existingVote] = queryResults;
    
    console.log(Number(existingVote[0].rating_maker) +'maker + asker'+ Number(existingVote[0].rating_asker));

    if (userVote === 'maker' && Number(existingVote[0].rating_maker) > 0 || 
        userVote === 'asker' && Number(existingVote[0].rating_asker) > 0){
      throw generateError(`Ya votaste el favor ${id} con tu usuario`,403);
    }

    // Guardar el voto en la base de datos
    if(userVote === 'asker'){
      await connection.query(
        `
        UPDATE favours SET rating_asker=?, modification_date=UTC_TIMESTAMP
        WHERE id=?
      `,
        [vote, id]
      );
    } else {
      await connection.query(
        `
        UPDATE favours SET rating_maker=?, modification_date=UTC_TIMESTAMP
        WHERE id=?
      `,
        [vote, id]
      );
    }

    res.send({
      status: "ok",
      message: `Se guardó el voto (${vote} puntos) del usuario ${req.auth.id} en el favor ${id}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = voteFavour;
