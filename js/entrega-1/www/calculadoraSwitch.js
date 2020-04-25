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
function operarDosValoresSwitch() {
  let valor1 = pedirDatos('num');
  let valor2 = pedirDatos('num');
  let operador = pedirDatos('operador');
  switch (operador) {
    case '+':
      return valor1 + valor2;
      break;
    case '-':
      return valor1 - valor2;
      break;
    case '*':
      return valor1 * valor2;
      break;
    case '/':
      return valor1 / valor2;
      break;
    case '**':
      return valor1 ** valor2;
      break;
    default:
      return 'Has seleccionado una operación incorrecta';
      break;
  }
}
console.log(operarDosValoresSwitch());
