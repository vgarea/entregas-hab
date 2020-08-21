const Joi = require("@hapi/joi");
const { generateError } = require("../helpers");

// Valida nuevo favor
const newFavourSchema = Joi.object().keys({
  location: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(
      generateError("El campo location debe existir y ser mayor de 2 caracteres", 400)
    ),
  description: Joi.string()
    .max(10000)
    .required()
    .error(
      generateError("El campo descripción debe existir y ser menos de 10000 caracteres", 400)
    ),
  category: Joi.string()
    .required()
    .error(
      generateError("El campo categoría debe existir", 400)
    ),
  reason: Joi.string()
    .required()
    .error(
      generateError("El campo razón debe existir", 400)
  ),
  status: Joi.string()
    .required()
    .error(
      generateError("El campo estado debe existir", 400)
  ),
  deadline: Joi.string()
    .required()
    .error(
      generateError("El campo fecha límite debe existir", 400)
  ),
});
// Valida la modificación de un favor
const editFavourSchema = Joi.object().keys({
  location: Joi.string()
    .min(3)
    .max(100)
    .required()
    .error(
      generateError("El campo localización debe existir y ser mayor de 2 caracteres", 400)
    ),
  description: Joi.string()
    .max(10000)
    .required()
    .error(
      generateError("El campo descripción debe existir y ser menos de 10000 caracteres", 400)
    ),
  category: Joi.string()
    .required()
    .error(
      generateError("El campo categoría debe existir", 400)
    ),
  reason: Joi.string()
    .required()
    .error(
      generateError("El campo razón debe existir", 400)
  ),
  status: Joi.string()
    .required()
    .error(
      generateError("El campo estado debe existir", 400)
  ),
  deadline: Joi.string()
    .required()
    .error(
      generateError("El campo fecha límite debe existir", 400)
  ),
});
// Valida la votación de los usuarios que hacen o reciben favores
const voteFavourSchema = Joi.object().keys({
  vote: Joi.number()
    .min(1)
    .max(5)
    .required()
    .error(
      generateError("El campo voto debe existir y tener un valor entre 1 y 5 (incluídos)", 400)
    ),
});

module.exports = {
  newFavourSchema,
  editFavourSchema,
  voteFavourSchema,
};
