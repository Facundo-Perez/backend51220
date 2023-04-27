import fs from 'fs'
import { Router } from 'express';
const router = Router();
class ProductManager {
    static last_id = 0;

    constructor() {
        this.path ='./productList.json'
        this.products= [];    
    }
    
    addProduct (title,description,price,thumbnail,code,stock) {
        
        if (!title || !description || !price ||!thumbnail || !code|| !stock){
            console.log("Error : All fields are required.")
            return;
        };
        const find = this.products.some(product => product.code === code);
         if (find) {
            console.log (`Attention: There is already a product with the code ${code}`);
            return;
         }


        ProductManager.last_id = ProductManager.last_id + 1;
        
        const new_product = {
            id: ProductManager.last_id,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
            
        }
        this.products.push(new_product);
        console. log ( "Product added successfully.");
            fs.writeFile(this.path, JSON.stringify(this.products), (error) => {
                if (error) throw error;
                console.log('File saved successfully.');
            });
          
    }
    
    async getProducts() {
        try {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);     
        console.log(products);
        return products;
            
        } catch (error) {
        console.log (error);
        return; 
        }
    };

    async getProductById(id) {
    const data = await fs.promises.readFile(this.path, 'utf-8');
    const productsById = JSON.parse(data);
    const product = productsById.find(product => product.id === id);
    if(product){
    console.log(product);
    return product;
    }
    else{
    console.log("Product not found");    
    }
    
  };
  async updateProduct (id, field, updateData){
    const data = await fs.promises.readFile(this.path, 'utf-8');
    const products = JSON.parse(data);
    const pIndex = products.findIndex(product => product.id === id);
    if (pIndex === -1){
        console.log('Product not found')
        return;
    }
    products[pIndex][field] = updateData;
    fs.writeFile(this.path, JSON.stringify(products), error =>{
        if (error) throw error;
        console.log('The product was successfully updated.')
    });
  }
  async deleteProduct (deleteById){
    const data = await fs.promises.readFile(this.path, 'utf-8');
    const products = JSON.parse(data);
    const deleteItemFilter = products.filter(product => product.id !== deleteById);

    if(deleteById.length === products.length) {
        console.log(`Product ID: ${deleteById} not found`);
        return;
    }
    fs.writeFile(this.path, JSON.stringify(deleteItemFilter), error =>{
        if(error) throw error;
        console.log('The product was successfully removed')
    });
  }

    }


//Test
    const newManager = new ProductManager();
    newManager.addProduct(
        "Product 01",
        "Description 01",
        10,
        "img1.jpg",
        "P01",
        10
    );
    newManager.addProduct(
        "Product 02",
        "Description 02",
        10,
        "img2.jpg",
        "P02",
        10
    );
    newManager.addProduct(
        "Product 03",
        "Description 03",
        10,
        "img3.jpg",
        "P03",
        10
    );
    newManager.addProduct(
        "Product 04",
        "Description 04",
        10,
        "img4.jpg",
        "P04",
        10
    );
    newManager.addProduct(
        "Product 05",
        "Description 05",
        10,
        "img5.jpg",
        "P05",
        10
    );
    newManager.addProduct(
        "Product 06",
        "Description 06",
        10,
        "img6.jpg",
        "P06",
        10
    );
    newManager.addProduct(
        "Product 07",
        "Description 07",
        10,
        "img7.jpg",
        "P07",
        10
    );
    newManager.addProduct(
        "Product 08",
        "Description 08",
        10,
        "img8.jpg",
        "P08",
        10
    );
2
    newManager.addProduct(
        "Product 09",
        "Description 09",
        10,
        "img9.jpg",
        "P09",
        10
    );
    newManager.addProduct(
        "Product 10",
        "Description 10",
        20,
        "img10.jpg",
        "P10",
        20
    );
    newManager.addProduct(
        "Product 11",
        "Description 11",
        30,
        "img11.jpg",
        "P11",
        30
    );
    console.log(newManager.getProducts)
    console.log(newManager.getProductById(1))
    console.log(newManager.getProductById(5)) // "Product not found"

    export default ProductManager;