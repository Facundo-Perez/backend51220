const express = require ('express');
const ProductManager = require('../ProductManager');
const PORT = 8080;

const app = express();
app.use(bodyParser.json());
// app.use(express.json);
app.use(express.urlencoded({extended: true}));


const products = new ProductManager('productsList.JSON');


app.get('/products/:pId', async(req,res)=>{
    const pId = req.params.pId;
    const product = products.find(prd => products.id === pId);

    if(!product) return res.send({error:'Product not found.'});
    
    res.send(product);
});

    
// Rutas de productos
const productsRouter = require('./routes/products.js');
app.use('/api/', productsRouter);

// Rutas de carritos
const cartsRouter = require('./routes/carts.js');
app.use('/api/', cartsRouter);

app.listen(PORT, () =>{
    console.log(`Server Express active in port ${PORT}.`);
});
