'use strict';
let equipoMaria = [62, 34, 55, 'María'];
let equipoPaula = [35, 60, 59, 'Paula'];
let equipoRebeca = [40, 39, 63, 'Rebeca'];
let arrayDeEquipos = [equipoMaria, equipoPaula, equipoRebeca];
function calcularMedia(arrayDePuntos) {
  let sumaTotales = 0;
  for (let i = 0; i < arrayDePuntos.length - 1; i++) {
    sumaTotales += arrayDePuntos[i];
  }
  return sumaTotales / (arrayDePuntos.length - 1);
}
function calcularMediaAlta(equipos) {
  let mediaDeCadaEquipo = [];
  let guardarValorMasAlto = {
    valor: 0,
    nombreEquipo: 0
  };
  for (let i = 0; i < equipos.length; i++) {
    mediaDeCadaEquipo[i] = calcularMedia(equipos[i]);
    if (mediaDeCadaEquipo[i] > guardarValorMasAlto.valor) {
      guardarValorMasAlto.valor = mediaDeCadaEquipo[i];
      guardarValorMasAlto.nombreEquipo = equipos[i][3];
    }
  }
  return guardarValorMasAlto;
}
console.log(
  `La media más alta es: ${calcularMediaAlta(arrayDeEquipos).valor} \nY el equipo el de: ${
    calcularMediaAlta(arrayDeEquipos).nombreEquipo
  }`
);
