const os = require('os');
const chalk = require('chalk');

const totalMem = os.totalmem();
const freeMem = os.freemem();

const usedPercent = 100 - (freeMem *100) / totalMem;

const humanPercent = usedPercent.toFixed(2);

if(usedPercent < 25){
    console.log(chalk.green.bgWhite.bold(`Tienes el ${humanPercent} de memoria usada`));
} else if(usedPercent <=75 && usedPercent > 25) {
    console.log(chalk.black.bgWhite.bold(`Tienes el ${humanPercent} de memoria usada`));
}else {
    console.log(chalk.red.bgWhite.bold(`Tienes el ${humanPercent} de memoria usada`));
}

