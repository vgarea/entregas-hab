const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");
const crypto = require("crypto");

const sendgrid = require("@sendgrid/mail");

const { getConnection } = require("./db");
const { format, addMinutes } = require("date-fns");
const es = require("date-fns/locale/es");

// Definimos directorio de subida de imágenes
const imageUploadPath = path.join(__dirname, process.env.UPLOADS_DIR);

function formatDateToDB(date) {
  let internalDate;
  if(typeof date === 'string'){
    internalDate = new Date(date);
  } else {
    internalDate = date;
  }
  const adjustedDate = addMinutes(
    internalDate,
    internalDate.getTimezoneOffset()
  );
  return format(adjustedDate, "yyyy-MM-dd HH:mm:ss", { locale: es });
}

async function processAndSaveImage(uploadedImage) {
  // Creamos el directorio (con recursive: true por si hay subdirectorios y así no da error)
  await fs.mkdir(imageUploadPath, { recursive: true });

  // Leer la imagen que se subio
  const image = sharp(uploadedImage.data);

  // Saco información de la imagen
  const imageInfo = await image.metadata();

  // Cambiarle el tamaño si es necesario
  if (imageInfo.width > 1000) {
    image.resize(1000);
  }

  // Guardar la imagen en el directorio de subidas
  const imageFileName = `${uuid.v4()}.jpg`;
  await image.toFile(path.join(imageUploadPath, imageFileName));

  // Devolver el nombre con el que fue guardada
  return imageFileName;
}

async function deleteUpload(uploadedImage) {
  await fs.unlink(path.join(imageUploadPath, uploadedImage));
}

function randomString(length = 20) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}

// Función de envío de Mail
async function sendMail({ email, title, content }) {
  // Configurar api key de sendgrid
  sendgrid.setApiKey(process.env.SENDGRID_KEY);

  // Configurar mensaje
  /* MEJORA: poner un script con CSS para darle estilo a este mensaje */
  const message = {
    to: email,
    from: process.env.SENDGRID_FROM,
    subject: title,
    text: content,
    html: `
      <div>
        <h1>${title}</h1>
        <p>${content}</p>
      </div>
    `,
  };
  
  // Enviar mensaje
  await sendgrid.send(message);
}

// Función para generar el Error
function generateError(message, code = 500) {
  const error = new Error(message);
  error.httpStatus = code;
  return error;
}

function showDebug(message) {
  if (process.env.NODE_ENV === "development") {
    console.log(message);
  }
}

// COMPROBAR FECHAS FIN
async function checkData(){
  console.log('comprobar fecha fin');
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
    //const [currentEntry] = current;
    
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

module.exports = {
  formatDateToDB,
  processAndSaveImage,
  deleteUpload,
  randomString,
  sendMail,
  generateError,
  showDebug,
  checkData
};
