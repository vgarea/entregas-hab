'use strict';
function binaryConverter(str) {
  let numeroDecimal = 0;
  for (let i = 0; i < str.length; i++) {
    if (Number(str.charAt(i)) === 0 || Number(str.charAt(i)) === 1) {
      numeroDecimal += Math.pow(2, str.length - i - 1) * Number(str.charAt(i));
    } else {
      return binaryConverter(prompt('Escribe un número en binario, por ejemplo 1001101'));
    }
  }
  return numeroDecimal;
}

console.log(binaryConverter(prompt('Escribe un número en binario, por ejemplo 1001101')));
