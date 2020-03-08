'use strict';
function pedirDatos(tipoValor) {
  let dimeDato;
  if (tipoValor === 'num') {
    dimeDato = +prompt('dime un número');
    if (comprobarTipoDeDato(dimeDato)) {
      return dimeDato;
    } else {
      console.log('El dato no es correcto');
      return pedirDatos(tipoValor);
    }
  } else {
    dimeDato = prompt('dime cómo los operamos');
    if (comprobarTipoDeDato(dimeDato)) {
      return dimeDato;
    } else {
      console.log('El operador no es correcto');
      return pedirDatos(tipoValor);
    }
  }
}
function comprobarTipoDeDato(valor) {
  if (valor !== 'Number' && (valor === '+' || valor === '-' || valor === '*' || valor === '/' || valor === '**')) {
    return true;
  } else if (valor < 0 || valor >= 0) {
    return true;
  }
}
function operarDosValores() {
  let valor1 = pedirDatos('num');
  let valor2 = pedirDatos('num');
  let operador = pedirDatos('operador');
  if (operador === '+') {
    return valor1 + valor2;
  } else if (operador === '-') {
    return valor1 - valor2;
  } else if (operador === '*') {
    return valor1 * valor2;
  } else if (operador === '/') {
    return valor1 / valor2;
  } else if (operador === '**') {
    return valor1 ** valor2;
  }
}
console.log(operarDosValores());
