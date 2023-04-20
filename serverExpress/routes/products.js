const express = require('express');
const router = express.Router();
const ProductManager = require('../../ProductManager');
const products = [];

router.get('/products', async (req, res) => {
    req.status(200);
    const allProducts = await products.getAll();
    
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const pLimit = limit ? products.slice(0, limit) : allProducts;
    res.send(pLimit);
    
  });
  
  router.get('/products/:pId', async (req, res) => {
    
    const pId = req.params.pId;
    const product = products.find(prd => products.id === pId);

    if(!product) return res.send({error:'Product not found.'});
    
    res.send(product);
   
  });
  
  router.post('/products', async(req, res) => {
    
    const { title, description, code, price, status, stock, category } = req.body;
    
    const newProduct = {
    id: ProductManager.last_id,    
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
  });
  
  router.put('/products/:id', (req, res) => {
    
    const pId = parseInt(req.params.pid);
    const { title, description, code, price, status, stock, category } = req.body;

    const productId = products.findIndex(product => product.id === pId);

    if (productId === -1) {
    res.status(404).json({ message: 'Product not found' });
    } else {
    const updatedProduct = {
      ...products[productId],
      title: title || products[productId].title,
      description: description || products[productId].description,
      code: code || products[productId].code,
      price: price || products[productId].price,
      status: status || products[productId].status,
      stock: stock || products[productId].stock,
      category: category || products[productId].category
    };

    products[productId] = updatedProduct;
    res.json(updatedProduct);
  }
});
  
  
  router.delete('/products/:id', (req, res) => {
    const pid = parseInt(req.params.pid);
    const productIndex = products.findIndex(product => product.id === pid);
  
    if (productIndex === -1) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      products.splice(productIndex, 1);
      res.json({ message: 'The product was successfully removed' });
    }
  });
  

  module.exports = router;