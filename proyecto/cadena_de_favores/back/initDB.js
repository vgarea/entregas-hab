require("dotenv").config();

const faker = require("faker/locale/es");
const { getConnection } = require("./db");
const { formatDateToDB } = require("./helpers");
const { random } = require("lodash");

let connection;

async function main() {
  try {
    // Conseguir conexión a la base de datos
    connection = await getConnection();

    // Borrar las tablas si existen (users, favours, favour_status)
    console.log("Borrando tablas");
    await connection.query("SET FOREIGN_KEY_CHECKS=0");
    await connection.query("DROP TABLE IF EXISTS users");
    await connection.query("DROP TABLE IF EXISTS favours");
    //await connection.query("DROP TABLE IF EXISTS favour_status");

    //await connection.query("DROP TABLE IF EXISTS diary");
    //await connection.query("DROP TABLE IF EXISTS diary_votes");

    // Crear las tablas de nuevo
    console.log("Creando tablas");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100),
        surname VARCHAR(150),
        alias TINYTEXT,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TINYTEXT NOT NULL,
        foto TINYTEXT,
        registrationDate DATETIME NOT NULL,
        role ENUM("normal", "admin") DEFAULT "normal" NOT NULL,
        active BOOLEAN DEFAULT false,
        registrationCode TINYTEXT,
        passwordUpdateCode TINYTEXT,
        lastUpdate DATETIME NOT NULL,
        lastAuthUpdate DATETIME NOT NULL
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS favours(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        rating_asker INT UNSIGNED,
        rating_maker INT UNSIGNED,
        location VARCHAR(50),
        description VARCHAR(500),
        category ENUM("manitas", "nanny", "transporte", "tareas casa", "otros") DEFAULT "otros" NOT NULL,
        status ENUM("pendiente", "asignado", "finalizado", "cancelado", "vencido") DEFAULT "pendiente" NOT NULL,
        reason ENUM("movilidad reducida", "hospitalización", "vivo sol@") NOT NULL,
        deadline DATETIME NOT NULL,
        creation_date DATETIME NOT NULL,
        modification_date DATETIME,
        user_asker_id INT UNSIGNED,
        FOREIGN KEY (user_asker_id) REFERENCES users(id),
        user_maker_id INT UNSIGNED,
        FOREIGN KEY (user_maker_id) REFERENCES users(id)
      );
    `);

    /*
    await connection.query(`
      CREATE TABLE IF NOT EXISTS favour_status (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          vote TINYINT NOT NULL,
          status_favour ENUM("pendiente", "asignado", "finalizado", "cancelado", "vencido") DEFAULT "pendiente" NOT NULL,
          user_maker_id INT UNSIGNED,
          FOREIGN KEY (user_maker_id) REFERENCES users(id),
          date DATETIME NOT NULL,
          lastUpdate DATETIME NOT NULL
        )
    `);
   
    await connection.query(`
      CREATE TABLE IF NOT EXISTS diary (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        date DATETIME NOT NULL,
        description TEXT,
        place VARCHAR(200) UNIQUE NOT NULL,
        foto TINYTEXT,
        user_id INTEGER NOT NULL,
        lastUpdate DATETIME NOT NULL
        );
    `);

    await connection.query(`
      CREATE TABLE diary_votes (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          entry_id INTEGER NOT NULL,
          vote TINYINT NOT NULL,
          date DATETIME NOT NULL,
          user_id INTEGER NOT NULL,
          lastUpdate DATETIME NOT NULL
        )
    `);
    */
    await connection.query("SET FOREIGN_KEY_CHECKS=1");

    // Meter datos de prueba en las tablas
    console.log("Creando usuario administrador");

    await connection.query(
      `
      INSERT INTO users(registrationDate, email, password, role, name, surname, alias, active, lastUpdate, lastAuthUpdate)
      VALUES(UTC_TIMESTAMP, "vanessa@almao.es", SHA2("${process.env.DEFAULT_ADMIN_PASSWORD}", 512), "admin", "Vanessa", "Almao Garea", "drgnzt", true, UTC_TIMESTAMP, UTC_TIMESTAMP)
    `
    );

    console.log("Metiendo datos de prueba en users");
    const users = 10;

    for (let index = 0; index < users; index++) {
      const email = faker.internet.email();
      const name = faker.name.firstName();
      const surname = faker.name.lastName();
      //const alias = faker.name.firstName();

      await connection.query(
      `
        INSERT INTO users(registrationDate, email, password, role, name, surname, alias, lastUpdate, lastAuthUpdate)
        VALUES(UTC_TIMESTAMP, "${email}", SHA2("${faker.internet.password()}", 512), "normal", "${name}", "${surname}", "${name}", UTC_TIMESTAMP, UTC_TIMESTAMP)
      `
      );
    }

    console.log("Metiendo datos de prueba en favours");
    const favoursEntries = 10;
    const categoryType = ["manitas", "nanny", "transporte", "tareas casa", "otros"];
    const favourType = ["pendiente", "asignado", "finalizado", "cancelado", "vencido"];
    const reasonType = ["movilidad reducida", "hospitalización", "vivo sol@"];

    for (let index = 0; index < favoursEntries; index++) {
      const date = formatDateToDB(faker.date.recent());

      await connection.query(`
        INSERT INTO favours(rating_asker, rating_maker, location, description, category, status, reason, deadline, creation_date, user_asker_id, user_maker_id )
        VALUES(
          "${random(1, 5)}",
          "${random(1, 5)}",
          "${faker.address.city()}",
          "${faker.lorem.paragraph()}",
          "${categoryType[random(0, categoryType.length-1)]}",
          "${favourType[random(0, favourType.length-1)]}",
          "${reasonType[random(0, reasonType.length-1)]}",
          "${date}",  
          UTC_TIMESTAMP(),
          "${random(2, users + 1)}",
          "${random(2, users + 1)}")
      `);
    }

    /*
    console.log("Metiendo datos de prueba en favour_status");
    const favourStatusEntries = 10;

    for (let index = 0; index < favourStatusEntries; index++) {
      const date = formatDateToDB(faker.date.recent());
      const favourType = ["pendiente", "asignado", "finalizado", "cancelado", "vencido"];

      await connection.query(`
        INSERT INTO favour_status(vote, status_favour, user_maker_id, date, lastUpdate)
        VALUES (
          "${random(1, 5)}",
          "${favourType[random(0, favourType.length-1)]}",
          "${random(2, users + 1)}",
          "${date}",
          UTC_TIMESTAMP())
      `);
    }

    console.log("Metiendo datos de prueba en diary");
    const diaryEntries = 10;

    for (let index = 0; index < diaryEntries; index++) {
      const date = formatDateToDB(faker.date.recent());

      await connection.query(`
        INSERT INTO diary(date, description, place, lastUpdate, user_id)
        VALUES(
          "${date}", 
          "${faker.lorem.paragraph()}", 
          "${faker.address.city()}", 
          UTC_TIMESTAMP(), 
          "${random(2, users + 1)}")
      `);
    }
    */
    /*
    console.log("Metiendo datos de prueba en diary_votes");
    const diaryVotesEntries = 100;

    for (let index = 0; index < diaryVotesEntries; index++) {
      // entry_id, vote, date, ip, lastUpdate
      const date = formatDateToDB(faker.date.recent());

      await connection.query(`
        INSERT INTO diary_votes(entry_id, vote, date, user_id, lastUpdate)
        VALUES (
          "${random(1, diaryEntries)}", 
          "${random(1, 5)}", 
          "${date}", 
          "${random(2, users + 1)}", 
          UTC_TIMESTAMP())
      `);
    }
    */
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Todo hecho, liberando conexión");
    if (connection) connection.release();
    process.exit();
  }
}

main();
