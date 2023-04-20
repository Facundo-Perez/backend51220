const express = require('express');
const router = express.Router();

let carts = [];

router.get('/carts', (req, res) => {
  
  });
  
  router.get('/carts/:id', (req, res) => {
    const cartId = parseInt(req.params.id);

    const cart = carts.find(c => c.id === cartId);
  
    if (!cart) {
      res.status(404).json({ message: 'Cart not found.' });
      return;
    }
  
    res.json(cart.products);
    
  });
  
  router.post('/carts', (req, res) => {
    
    const newCart = {
        id: Math.floor(Math.random() * 1000), 
        products: []
      };
      carts.push(newCart);
      res.status(201).json(newCart);
    });
    
    router.get('/', (req, res) => {
      res.json(carts);
    });
  

  module.exports = router;