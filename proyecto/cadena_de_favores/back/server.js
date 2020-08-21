require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');

const entryExists = require("./middlewares/entryExists");
const isUser = require("./middlewares/isUser");
const isAdmin = require("./middlewares/isAdmin");

const listFavours = require("./controllers/favours/listFavours");
const listFavoursFind = require("./controllers/favours/listFavoursFind");
const listFavoursAsker = require("./controllers/favours/listFavoursAsker");
const listFavoursMaker = require("./controllers/favours/listFavoursMaker");
const asignFavour = require("./controllers/favours/asignFavour");
const editFavour = require("./controllers/favours/editFavour");
const voteFavour = require("./controllers/favours/voteFavour");
const newFavour = require("./controllers/favours/newFavour");
//const deleteEntry = require("./controllers/diary/deleteEntry");

// User controllers
const newUser = require("./controllers/users/newUser");
const validateUser = require("./controllers/users/validateUser");
const loginUser = require("./controllers/users/loginUser");
const listUsers = require("./controllers/users/listUsers");
const getUser = require("./controllers/users/getUser");
const editUser = require("./controllers/users/editUser");
const deleteUser = require("./controllers/users/deleteUser");
const editUserPassword = require("./controllers/users/editUserPassword");
const recoverUserPassword = require("./controllers/users/recoverUserPassword");
const resetUserPassword = require("./controllers/users/resetUserPassword");

const { checkData } = require('./helpers');

const app = express();

// Middlewares iniciales

// Log de peticiones a la consola
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Procesado de body tipo json
app.use(bodyParser.json());

// Procesado de body tipo form-data
app.use(fileUpload());

// Intercambio de origen cruzado para habilitar solicitudes de HTTP
app.use(cors());


// 
app.use(express.static("static"));

/*
  ENDPOINTS DE FAVORES
*/

// Listar multiples entradas de favores
// GET - /favours ✅
// Público
app.get("/favours", listFavours);

// Listar multiples entradas de favores
// POST - /favours ✅
// Público
app.post("/favours/find", listFavoursFind);

// Listar los favores de usuario pedichón
// GET - /favours/:id ✅
// Público
app.get("/favours/asker/:id", listFavoursAsker);

// Listar los favores de usuario héroe
// GET - /favours/:id ✅
// Público
app.get("/favours/maker/:id", listFavoursMaker);

// Aceptar un favor
// POST - /favours/:id ✅
// Sólo usuarios registrados
app.post("/favours/:id", isUser, asignFavour);

// Editar un favor
// PUT - /favours/:id ✅
// Sólo el usuario que lo ha subido o admin
app.put("/favours/:id", isUser, entryExists, editFavour);

// Votar un favor asker o maker
// POST - /favours/:id/votes ✅
// Sólo usuarios registrados
app.post("/favours/:id/votes", isUser, entryExists, voteFavour);

// Crear un nuevo favor
// POST - /favours ✅
// Sólo usuarios registrados
app.post("/favours", isUser, newFavour);

/*
  ENDPOINTS DE CONTENIDO
*/

// Listar multiples entradas del diario de viajas
// GET - /entries ✅
// Público
//app.get("/entries", listEntries);

// Mostrar una sola entrada del diario
// GET - /entries/:id ✅
// Público
//app.get("/entries/:id", entryExists, getEntry);

// Crear una nueva entrada del diario
// POST - /entries ✅
// Sólo usuarios registrados
//app.post("/entries", isUser, newEntry);

// Editar una entrada del diario
// PUT - /entries/:id ✅
// Sólo usuario que creara esta entrada o admin
//app.put("/entries/:id", isUser, entryExists, editEntry);

// Borrar una entrada del diario
// DELETE - /entries/:id ✅
// Sólo usuario que creara esta entrada o admin
//app.delete("/entries/:id", isUser, entryExists, deleteEntry);

// Votar una entrada
// POST - /entries/:id/votes ✅
// Sólo usuarios registrados
//app.post("/entries/:id/votes", isUser, entryExists, voteEntry);

// Ver votos de una entrada
// GET - /entries/:id/votes ✅
// Público
//app.get("/entries/:id/votes", entryExists, getEntryVotes);

/*
  ENDPOINTS DE USUARIO
*/

// Registro de usuarios
// POST - /users ✅
// Público
app.post("/users", newUser);

// Validación de usuarios registrados
// GET - /users/validate/:code ✅
// Público
app.get("/users/validate/:code", validateUser);

// Login de usuarios
// POST - /users/login ✅
// Público
app.post("/users/login", loginUser);

// Ver listado de usuarios
// GET - /users
// Para todos los usuarios
app.get("/users", listUsers);

// Ver información de un usuario
// GET - /users/:id ✅
// Sólo para usuarios registrados
// Pero si el usuario es el mismo o admin debería mostrar toda la información
app.get("/users/:id", isUser, getUser);

// Editar datos de usuario: email, name, avatar
// PUT - /users/:id ✅
// Sólo el propio usuario o el usuario admin
app.put("/users/:id", isUser, editUser);

// Borrar un usuario
// DELETE- /users/:id ✅
// Sólo el usuario admin
app.delete("/users/:id", isUser, isAdmin, deleteUser);

// Editar password de usuario
// POST - /users/:id/password
// Sólo el propio usuario
app.post("/users/:id/password", isUser, editUserPassword);

// Enviar código de reset de password
// POST - /users/recover-password
// Público
app.post("/users/recover-password", recoverUserPassword);

// Resetear password de usuario
// POST - /users/reset-password
// Público
app.post("/users/reset-password", resetUserPassword);


// 
setInterval(() => {
  checkData();
}, 10000);
// lanzamos la comprobación
checkData();

// Middlewares finales

// Error middleware
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

// Not found
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`API funcionando en http://localhost:${port} 🙈`);
});
