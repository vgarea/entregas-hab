/* definimos variables */
const mainContainer = document.querySelector('main');
const buttonSend = document.querySelector('body header section button');
const text = document.querySelector('body header section textarea');

/* Creamos la estructura que vamos a añadir */
/*
<section>
    <p>texto</p>
    <time class="date">fecha</time>
    <button class="button">Borrar</button>
</section>
*/
const createMessage = (texto) => {
    const p1 = document.createElement('p');
    p1.textContent = texto;

    const p2 = document.createElement('time');
    p2.classList.add('date');

    const today = new Date();
    const day = today.getDay();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    
    p2.textContent = `${day}/${month}/${year}`

    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('button');
    buttonDelete.textContent = 'Borrar';
    
    /* variables de estructura */
    const message = document.createElement('section');
    
    message.append(p1);
    message.append(p2);
    message.append(buttonDelete);
    
    mainContainer.prepend(message);

    // Tenemos que añadir el evento al botón borrar
    buttonDelete.addEventListener('click', () => message.remove());
}

const addMessage = () => {
    const textMessege = text.value;
    //console.log(textMessege);
    if(textMessege.length === 0 || textMessege.length > 250) {
        alert('Tienes que introducir un texto menor que 250 caracteres');
    } else {
        createMessage(textMessege);
        text.value = '';
    }
}

const deleteMessege = (buttonSelected) => {
    //aquí tengo que eliminar el mensaje creado
    console.log(buttonSelected);
    
}

//createMessage();
//mainContainer.append(messageProv);


buttonSend.addEventListener('click', addMessage);

//buttonDelete.addEventListener('click', deleteMessege);