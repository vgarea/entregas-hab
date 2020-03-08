'use strict';
function programaDado(puntosTotales) {
  let sumaDado = 0;
  let valorDado = 0;
  let i = 0;
  do {
    valorDado = Math.round(Math.random() * 6);
    valorDado > 0 ? (sumaDado += valorDado) : false;
    console.log(`Tirada ${i}: ha salido un ${valorDado}. Tienes un total de ${sumaDado} puntos.`);
    i++;
  } while (sumaDado < 50);
  console.log(`¡Enhorabuena, ha salido un ${valorDado}! ¡Has ganado con un total de ${sumaDado} puntos!.`);
}
programaDado(50);
