import { Router } from "express";
let cartsRouter = [];
const router = Router();
router.get('/carts', (req, res) => {
  
  });
  
  router.get('/carts/:id', (req, res) => {
    const cartId = parseInt(req.params.id);

    const cartRouter = carts.find(c => c.id === cartId);
  
    if (!cartRouter) {
      res.status(404).json({ message: 'Cart not found.' });
      return;
    }
  
    res.json(cartRouter.products);
    
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
  

  export default router;