class ProductManager {
    static last_id = 0;

    constructor() {
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

        
    }
    
    getProducts = () =>{
        this.products;
    };

    getProductById = (id) =>{
        const product = this.products.find((product) => product.id === id);
    console.log(product ? product : "Product not found");
  };
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
        20,
        "img2.jpg",
        "P02",
        20
    );
    newManager.addProduct(
        "Product 03",
        "Description 03",
        30,
        "img3.jpg",
        "P03",
        30
    );
    console.log(newManager.getProducts)
    console.log(newManager.getProductById(1))
    console.log(newManager.getProductById(5)) // "Product not found"
