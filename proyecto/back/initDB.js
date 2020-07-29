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

    // Borrar las tablas si existen (users, favours, diary, diary_votes)
    console.log("Borrando tablas");
    await connection.query("SET FOREIGN_KEY_CHECKS=0");
    await connection.query("DROP TABLE IF EXISTS favours");
    await connection.query("DROP TABLE IF EXISTS users");

    await connection.query("DROP TABLE IF EXISTS diary");
    await connection.query("DROP TABLE IF EXISTS diary_votes");

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
        rating_applicant INT UNSIGNED,
        rating_user INT UNSIGNED,
        location VARCHAR(50),
        description VARCHAR(500),
        category ENUM("manitas", "nanny", "transporte", "tareas casa", "otros") DEFAULT "otros" NOT NULL,
        deadline DATETIME NOT NULL,
        status VARCHAR(50),
        creation_date DATETIME NOT NULL,
        modification_date DATETIME,
        user_doer_id INT UNSIGNED,
        FOREIGN KEY (user_doer_id) REFERENCES users(id),
        user_maker_id INT UNSIGNED,
        FOREIGN KEY (user_maker_id) REFERENCES users(id)
      );
    `);
    
    await connection.query(`
      CREATE TABLE diary (
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

    for (let index = 0; index < favoursEntries; index++) {
      const date = formatDateToDB(faker.date.recent());

      await connection.query(`
        INSERT INTO favours(location, description, category, deadline, creation_date, user_doer_id )
        VALUES(
          "${faker.address.city()}",
          "${faker.lorem.paragraph()}",
          "${categoryType[random(0, categoryType.length-1)]}",
          "${date}",  
          UTC_TIMESTAMP(),
          "${random(2, users + 1)}")
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
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Todo hecho, liberando conexión");
    if (connection) connection.release();
    process.exit();
  }
}

main();
