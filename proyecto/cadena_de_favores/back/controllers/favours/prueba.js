// Comprobar que el usuario maker no coicide con el asker
    // y que la password antigua es la correcta
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
    console.log(id + ' :: ' + result[0].user_asker_email+' +++ '+ result[0].user_maker_email);

    // Comprobar que el usuario que hace la petición no es el que pide el favor
    if (result[0].user_asker_id === req.auth.id) {
      throw generateError("No puedes aceptar un reto que tú has propuesto", 403);
    }

    // Enviar aviso al asker
    try {
      await sendMail({
        email: result[0].user_asker_email,
        title: `El #HEROE ${result[0].user_maker_name} ${result[0].user_maker_surname} ha aceptado tu petición`,
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
        title: `El #HEROE ${result[0].user_asker_name} ${result[0].user_asker_surname} ha aceptado tu petición`,
        content: `
          Ponte en contacto con ${result[0].user_asker_name} ${result[0].user_asker_surname} a través de su correo:
          ${result[0].user_asker_email}
        `,
      });
    } catch (error) {
      throw generateError("Error de envío de mail al MAKER", 500);
    }