const express = require ('express');
const ProductManager = require('../ProductManager');
const PORT = 8080;

const app = express();

const server = app.listen(PORT, () =>{
    console.log(`Server Express active in port ${PORT}.`);
});

const products = new ProductManager('productsList.JSON');

app.get('/products', async (req,res)=>{
    const allProducts = await products.getAll();
    res.send(allProducts);
});

app.get('/products/:pId', async(req,res)=>{
    const pId = req.params.pId;
    const product = products.find(prd => products.id === pId);

    if(!product) return res.send({error:'Product not found.'});
    
    res.send(product);
});