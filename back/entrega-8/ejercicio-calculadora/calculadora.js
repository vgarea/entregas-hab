const {suma, resta, multiplicacion, division} = require ('./lib/operations.js');
const [ , , ...arguments] = process.argv;

function calcular (valor){
    
    let total;
    valor[1] = Number(valor[1]);
    valor[2] = Number(valor[2]);

    switch (valor[0]){
        case "suma":
            if(process.env.LANG === 'en') valor[0] = 'add';
            total = suma(valor[1], valor[2]);
        break;
        case "resta":
            if(process.env.LANG === 'en') valor[0] = 'rest';
            total = resta(valor[1], valor[2]);
        break;
        case "multiplica":
            if(process.env.LANG === 'en') valor[0] = 'multiply';
            total = multiplicacion(valor[1], valor[2]);
        break;
        case "divide":
            if(process.env.LANG === 'en') valor[0] = 'divide';
            total = division(valor[1], valor[2]);
        break;
    }

    if(!total){
        if(process.env.LANG === 'en'){
            console.log('You must write suma, resta, multiplica or divide, width two numbers');
        } else {
            console.log('Has escrito algo mal, debes poner suma, resta, multiplica o divide, con dos números');
        }
    } else {
        if (process.env.LANG === 'en') {
            console.log(`The result of ${valor[0]} ${valor[1]} and ${valor[2]} is ${total}`);
        } else {
            console.log(`El resultado de ${valor[0]} ${valor[1]} y ${valor[2]} es ${total}`);
        }
    }
}

calcular(arguments);