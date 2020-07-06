'use strict'

const fs = require('fs').promises;
const path = require('path');
const chalk = require("chalk");
const sharp = require('sharp');
const minimist = require('minimist');

// node miniaturizer.js --input-dir=img_origen --output-dir=img_destino

// Obtener los datos de la cadena
const args = minimist(process.argv.slice(2));

// falta la comprobación de los args
const dirOrigen = args['input-dir'];
const dirDestiny = args['output-dir'];
//console.log(dirOrigen, dirDestiny);

async function main(dirOrigen, dirDestiny) {
    try {
        // Comprobamos el dir de las imágenes
        try {
            const dirOrigenInfo = await fs.stat(dirOrigen);
            if(!dirOrigenInfo.isDirectory()){
                throw new Error('');
            }            
        } catch (error) {
            throw new Error('El directorio de imágenes no existe');
        }
        // Crear directorio_destino si no existe
        try {
            await fs.mkdir(dirDestiny);
        } catch (error) {
            console.log('el directorio ya existe');
        }
        // Leemos el contenido del directorio
        const fotos = await fs.readdir(dirOrigen);

        for(const foto of fotos){
            // --
            const fotosPath =  path.join(dirOrigen, foto);
            const fotosMiniPath = path.join(dirDestiny, foto);

            console.log(`${path.extname(fotosPath) === '.jpg'} || ${path.extname(fotosPath) === '.jpeg'} || ${path.extname(fotosPath) === '.png'}`);

            if(path.extname(foto) === '.jpg' || path.extname(foto) === '.png') {
                const image = sharp(fotosPath).resize(600);
                // ponerle una marca de agua a vuestra elección 
                image.composite([
                    {
                    input: "./logo.png",
                    gravity: "northwest",
                    },
                ]);
                // guardar las miniaturas en directorio_destino
                await fs.writeFile(fotosMiniPath, await image.toBuffer());
            }
        }
    } catch (error) {
        console.error(chalk.red(error.message));
    
    }
}
  
main(dirOrigen, dirDestiny);
