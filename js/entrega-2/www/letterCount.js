'use strict';

let cadenaTexto = prompt('Escribe una cadena de texto:');

function letterCount(str) {
  let j = 0;
  let palabra = '';
  let arrayDePalabras = [];
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) != ' ') {
      palabra += str.charAt(i);
    } else {
      palabra = '';
      j++;
    }
    arrayDePalabras[j] = palabra;
  }
  return arrayDePalabras;
}
function compareStrings(arrayDePalabras) {
  console.log(arrayDePalabras);
  let bigWord;
  for (let i = arrayDePalabras.length - 1; i >= 0; i--) {
    if (i > 0 && arrayDePalabras[i - 1].length > arrayDePalabras[i].length) {
      bigWord = arrayDePalabras[i - 1];
    }
  }
  return bigWord;
}
console.log(compareStrings(letterCount(cadenaTexto)));
