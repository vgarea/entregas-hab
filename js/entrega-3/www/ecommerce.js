'use strict'

/* Crear un falso e-commerce.
* Por un lado tenemos todos los artículos que forman el stock de la tienda.
* Tendremos también un usuario que añade cosas a su carrito, que es privado.
* Los artículos cuando los metemos al carrito los convertimos un tipo de dato
* que guarda las unidades que tiene el usuario de dicho artículo.
* La tienda es la encargada de imprimir un ticket por la consola.*/

/*
* Primero crear la clase de los items, y ver que creas bien un item y tal
* después crear el inventario
* una vez que tienes el inventario pues ya te puedes olvidar de los items, aunque los usarás luego
* después crear el usuario, que va a tener un carrito que es privado
* el usuario cuando quiera añadir algo al carrito va a tener 2 posibilidades, 
* + o que lo que quiere meter en el carrito ya existiese en el carrito
* + o que sea algo nuevo
* como queremos guardar la cantidad de unidades de un artículo que tenemos en el carrito, vamos a tener que cuardarlo a mayores
* si buscamos el item que queriamos meter en el carrito y no existe, pues lo metemos y le asignariamos una cantidad de 1, porque de la manera que lo hicimos en clase los items los metemos de 1 en 1, luego puedes hacer una variante en la que meterias las unidades que quisieses.
* si ya existiese en el carrito, incrementariamos la cantidad que teniamos
* por ultimo el usuario tendrá un método que sea algo como comprar o pagar
* en el que le envia el carrito a la tienda
* y la tienda saca los datos por la consola
*/



const itemNames = ['Camisa', 'Pantalon', 'Calcetines'];
const itemPrices = [13, 27, 100];

//creamos nuestra clase del artículo
class Item {
    itemName;
    itemPrice;
    constructor(itemName, itemPrice){
        this.itemName = itemName;
        this.itemPrice = itemPrice;
    }
}

//creamos ahora nuestra lista de artículos
const itemList = itemNames.map((object, index) => {
    return new Item(object, itemPrices[index]);
});

//creamos la clase usuario
class User {
    //defino una variable en la que meter mi lista de compra
    #shoppingCart = [];

    //lleno el carrito
    fillCart(inventory, ammount){
        for(let i=0; i<ammount; i++){
            const inventoryIndex = Math.floor(Math.random() * inventory.lenght);
            this.addToCart(inventory[inventoryIndex]);
        }
    }

    //añado a la carta de compra
    addToCart(item){
        const itemFound = this.#shoppingCart.find((cartItem) => {
            return item.name === cartItem.name;
        });
        if(itemFound){
            itemFound.increaseAmmount();
        } else {
            this.#shoppingCart.push(new CartItem(item));
        }
    }

    get cart(){
        return this.#shoppingCart;
    }

    buy() {
        Shop.checkout(this.#shoppingCart); 
    }
}

const Manolo = new User();

class Shop {
    static checkout(shoppingCart){
        console.log('SHOP');
        const initialTotals = {totalPrice: 0, totalUnits: 0};
        const totals = shoppingCart.reduce((accumulator, currentItem) => {
            console.log(`${currentItem.name} ${currentItem.price}€ ${currentItem.ammount}   Total de item: ${currentItem.total}`);
            accumulator.totalPrice += currentItem.total;
            accumulator.totalUnits += currentItem.ammount;
            return accumulator;
        }, initialTotals);
        console.log(`Unidades totales ${totals.totalUnits}  Tienes que pagar ${totals.totalPrice}`)
    }
}

class CartItem extends Item {
    ammount = 1;
    constructor(item){
        super(item.itemName, item.itemPrice);
    }
    increaseAmmount(){
        this.ammount++;
    }
    get total(){
        return this.ammount * this.price;
    }
}
// Llenamos el carrito del usuario creado.
Manolo.fillCart(itemList, 50);

// Realizamos la compra.
Manolo.buy();