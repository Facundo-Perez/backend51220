import express from 'express';
import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js'
import ProductManager from '../ProductManager.js';
import bodyParser from 'body-parser';
const PORT = 8080;

const app = express();
app.use(bodyParser.json());

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

const products = new ProductManager('productsList.JSON');

    
// Rutas de productos y carritos

app.use('/api/', productsRouter);
app.use('/api/', cartsRouter);



app.listen(PORT, () =>{
    console.log(`Server Express active in port ${PORT}.`);
});
