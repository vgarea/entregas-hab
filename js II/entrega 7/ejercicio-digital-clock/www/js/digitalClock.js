const hora = document.querySelector('header h1');
const saludo = document.querySelector('header h2');

//const bodyBackground = document.querySelector('body.fondo');
const bodyBackground = document.body;

const headerClass = document.querySelector('header');

const stopHour = headerClass.getAttribute("data-hour");
const stopMinutes = headerClass.getAttribute('data-minute');
const stopSeconds = headerClass.getAttribute('data-second');

function format(number) {
    if (number >= 10) {return number};
     return ('0' + number);
}

const updateTime = () => {
    const fecha = new Date();

    fecha.setHours = '23';

    const hours = format(fecha.getHours());
    const minutes = format(fecha.getMinutes());
    const seconds = format(fecha.getSeconds());

    hora.textContent = `
    ${hours}:${minutes}:${seconds}
    `;

    saludo.textContent = greetings(fecha.getHours());
    
    if (String(hours) === stopHour && String(minutes) === stopMinutes && String(seconds) === stopSeconds) {
        clearInterval(intervalo);
    }
}

function greetings(hora){
    if(hora < 6 || hora >= 20 ) {
        bodyBackground.setAttribute('class', 'night');
        return 'Buenas noches';
    } else if(hora < 12 ) {
        bodyBackground.setAttribute('class', 'morning');
        return 'Buenos días';
    }
    bodyBackground.setAttribute('class', 'afternoon');
    return 'Buenas tardes';
}

updateTime();
const intervalo = setInterval(updateTime, 1000);