'use strict'

const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const { formatDistanceToNow } = require('date-fns');
const { es } = require('date-fns/locale');

async function getFile(pathName){
    try {
        let pathInfo
        try {
            // sacar info del path
            pathInfo = await fs.stat(pathName);
            //console.log(pathInfo);
        } catch (error) {
            throw new Error(`La ruta ${pathName} no existe`)
        }

        // comprobar que path es un fichero
        if(!pathInfo.isFile()){
            throw new Error(`La ruta ${pathName} no es un fichero`)
        }

        // comprobar que el archivo es > 10kb
        if(pathInfo.size > 10000){
            throw new Error(`El archivo ${pathName} pesa más de 10Kb`);
        }

        const content = await fs.readFile(pathName);

        return {
            createdAt: pathInfo.birthtime,
            content: content.toString(),
        }

        // leer el fichero y retornar la info necesaria (contenido y fecha creación)
    } catch (error) {
        console.error(chalk.red('---------------------'));
        console.error(chalk.red(error.message));
        console.error(chalk.red('---------------------'));
    }    
}

//comprobar si los archivos tienen menos de 10kb
async function main() {
    const arg = process.argv.slice(2);
    //console.log(arg);
    for(const argument of arg){
        const pathName = path.join(__dirname, argument);
        const fileData = await getFile(pathName);
        if(fileData){
            const distance = formatDistanceToNow(new Date(fileData.createdAt), {locale:es});
            console.log();
            console.log(chalk.blue(`El fichero ${argument} fue creado ${distance}`));
            console.log('Los contenidos del fichero son: ');
            console.log(fileData.content);
            console.log();
        }
    }
}
main();