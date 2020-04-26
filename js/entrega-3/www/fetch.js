'use strict'

/*
* Accede con fetch a la información de la siguiente API:
* https://api.exchangerate-api.com/v4/latest/EUR.
* Dado un valor en euros (EUR), convierte dicha cantidad a dólares (USD).
* Por último convierte el resultado obtenido en dólares a yenes (JPY).
*/


// Cantidad random en €
function getRandomValue (value){
    return Math.round(Math.random()*value); 
}

async function converseMoney(){
    const valorMax = 1000;
    const exchangeTable = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
    const exchangeTableData = await exchangeTable.json();
    //console.log(exchangeTable, exchangeTableData);
    const changeToDolars = Math.round(getRandomValue(valorMax) * exchangeTableData.rates.USD);
    console.log(`El cambio de ${getRandomValue(valorMax)}€ a $ es: ${changeToDolars}$`);
    const changeToYenes = Math.round(changeToDolars * exchangeTableData.rates.JPY);
    console.log(`El cambio de ${getRandomValue(valorMax)}€ a ¥ es: ${changeToYenes}¥`);
}

converseMoney();