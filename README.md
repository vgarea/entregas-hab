# entregas-hab

¿CÓMO CREAR EL REPOSITORIO PARA LAS ENTREGAS?

¡Aseguraos de ir guardando tras cada paso con Visual Studio Code!

Antes de comenzar a realizar ningún ejercicio de la entrega, debéis crear un nuevo repositorio en GitHub/GitLab con el nombre entregas-hab. Aseguraos de no marcar la opción de repositorio privado, si no ni podré acceder a él. Copiamos la clave HTTPS de nuestro nuevo repositorio, la clave SSH no nos sirve por el momento.

Ahora vamos a crear una carpeta de trabajo en nuestro ordenador en el directorio que más nos guste. Yo por ejemplo tengo en el escritorio una carpeta que se llama hackaboss. Pues bien, abrimos el terminal y nos dirigimos a esta carpeta de trabajo (es importante que sea desde el terminal). Ahora vamos a clonar el repositorio que hemos creado. Para ello utilizamos el comando git clone seguido de la dirección HTTPS que hemos copiado anteriormente.

Nuestro repositorio ya debería estar clonado. Debería figurar en la ruta establecida una carpeta con el mismo nombre que nuestro repo, para comprobarlo podemos usar el comando ls.

Entramos en la carpeta entregas-hab que acabamos de clonar y creamos una carpeta interna con el nombre de js. Dentro de esta carpeta, creamos otra con el nombre de entrega-1. Aquí deben ir los archivos de la primera entrega.

Nos dirigimos desde el terminal a esta nueva carpeta. Deberíamos estar en una ruta similar a /home/hab01/Desktop/hackaboss/entregas-hab/js/entrega-1. Vamos a crear un entorno de desarrollo en esta carpeta con browser-sync:

npm init -y
npm install browser-sync
code .
Con el último comando del apartado anterior se debería haber abierto la carpeta en el Visual Studio Code. Vamos a editar el package.json y añadimos la línea start al apartado scripts:

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "browser-sync start --server www --files www"
}

Creamos la carpeta www, y dentro de la misma los archivos index.htmly calculadora.js. Entramos al primero, escribimos ! y pulsamos tabulador. Dentro del body añadimos esta línea: <script src="calculadora.js"></script>.

En el archivo calculadora.js deberéis resolver el ejercicio correspondiente. Recordad que la primera línea debe ser 'use strict';. Podéis escribir un console.log('Hello World'); para comprobar que el servidor funciona. Para iniciar el servidor dirígete al terminal y asegúrate de estar en la carpeta entrega-1. Ejecutamos npm start.

Si ya habéis terminado de resolver el ejercicio es hora de subirlo a GitHub. Para ello debéis dirigiros desde el terminal a la carpeta principal del repositorio, es decir, aseguraos de estar ubicados en entregas-hab, y no en un directorio interno como pueda ser entrega-1. Ejecutamos los siguientes comandos:

git add \*
git commit -m "esto debe ser un comentario descriptivo que indique lo que estáis comiteando"
git push --> Esto nos solicitará nuestro usuario y password de GitHub.
Es posible que nos salte algún error al hacer commit que indique que debéis introducir vuestro email o nombre de usuario. En tal caso basta con utilizar el comando: git config --global user.email "mi_email@example.com". ¡Ojo! Se trata de que escribas tu email de GitHub entre las comillas, no de que copies y pegues el comando sin más. Luego repetimos el git commit -m "mi comentario".

Tras haber realizado estos pasos deberían figurar nuestros cambios en el repositorio en GitHub. <3
