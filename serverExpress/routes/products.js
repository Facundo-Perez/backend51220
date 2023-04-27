import { Router } from 'express';
import ProductManager from '../../ProductManager.js';
const productsRouter = [];
const router = Router();
router.get('/products', async (req, res) => {
    req.status(200);
    const allProducts = await productsRouter.getAll();
    
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const pLimit = limit ? productsRouter.slice(0, limit) : allProducts;
    res.send(pLimit);
    
  });
  
  router.get('/products/:pId', async (req, res) => {
    
    const pId = req.params.pId;
    const product = productsRouter.find(prd => productsRouter.id === pId);

    if(!product) return res.send({error:'Product not found.'});
    
    res.send(productsRouter);
   
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

  productsRouter.push(newProduct);
  res.status(201).json(newProduct);
  });
  
  router.put('/products/:id', (req, res) => {
    
    const pId = parseInt(req.params.pid);
    const { title, description, code, price, status, stock, category } = req.body;

    const productId = productsRouter.findIndex(product => product.id === pId);

    if (productId === -1) {
    res.status(404).json({ message: 'Product not found' });
    } else {
    const updatedProduct = {
      ...productsRouter[productId],
      title: title || productsRouter[productId].title,
      description: description || productsRouter[productId].description,
      code: code || productsRouter[productId].code,
      price: price || productsRouter[productId].price,
      status: status || productsRouter[productId].status,
      stock: stock || productsRouter[productId].stock,
      category: category || productsRouter[productId].category
    };

    productsRouter[productId] = updatedProduct;
    res.json(updatedProduct);
  }
});
  
  
  router.delete('/products/:id', (req, res) => {
    const pid = parseInt(req.params.pid);
    const productIndex = productsRouter.findIndex(product => product.id === pid);
  
    if (productIndex === -1) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      products.splice(productIndex, 1);
      res.json({ message: 'The product was successfully removed' });
    }
  });
  

 export default productsRouter;