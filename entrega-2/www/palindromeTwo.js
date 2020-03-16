'use strict';
function palindromeTwo(str) {
  let mensaje = '';
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === str.charAt(str.lenght - 1 - i)) {
      mensaje = `${str} es un palíndrome`;
    } else {
      mensaje = `${str} no es un palíndrome`;
    }
  }
  return mensaje;
}
console.log(palindromeTwo(prompt('Introduce un palíndrome')));
