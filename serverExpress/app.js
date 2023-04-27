import express from 'express';
import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js'
import ProductManager from '../ProductManager.js';


const PORT = 8080;

const app = express();
app.use(express.json());

app.use(express.urlencoded({extended: true}));

const products = new ProductManager('productsList.JSON');

    
// Rutas de productos y carritos

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(PORT, () =>{
    console.log(`Server Express active in port ${PORT}.`);
});
