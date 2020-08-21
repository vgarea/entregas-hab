import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001',
});


export default {
   /*  getProducts: () => {
        return instance.get('products/')
            .then(response => {
                return response.data;
            });
    },
    getProduct: (id) => {
        return instance.get('products/' + id + '/')
            .then(response => {
                return response.data
            });
    },
    addProduct: (product) => {
        return instance.post('products/', product)
    },
    deleteProduct: (product) => {
        return instance.delete('products/' + product.id + '/', product)
    },
    updatePrice: (product, newPrice) => {
        return instance.patch('products/' + product.id + '/', {
            price: newPrice
        });
    },
    updateQuantity: (product, newQuantity) => {
        return instance.patch('products/' + product.id + '/', {
            quantity: newQuantity
        });
    }, */
}