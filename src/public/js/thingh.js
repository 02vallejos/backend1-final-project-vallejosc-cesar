
    // console.log("titulo: " + req.body.title);
    // console.log("Descripcion: " + req.body.description);
    // console.log("Codigo: " + req.body.code);
    // console.log("Precio: " + req.body.price);
    // console.log("Stock: " + req.body.stock);
    // console.log("Categoria: " + req.body.category);
    // console.log("Foto: " + req.body.thumbnail);


    // class ProductManager {
    //     static lastId = 0;
    //     constructor() {
        // constructor(path) {
            // this.products = [];
            // this.path = path
        // }

    // async addProduct({ title, description, code, status, price, stock, category, thumbnail, path }) {

        // Podemos leer el archivo y guardarme el array de producto
        // const arrayProducts = await this.readProducts();

        // if (!title 
        //     || !description 
        //     || !code 
        //     || !status 
        //     || !price 
        //     || !stock 
        //     || !category 
        //     || !thumbnail
        //     || !path ) {
        //     console.log("Ningun codigo valido");
        //     return;
        // }

        // validamos el codigo
        // if (arrayProducts.some(item => item.code === code)) {
        //     console.log("Ya existe un producto con ese codigo!");
        //     return;
        // }

        // si pasamos las validacioens ahora podemos crear el producto
        // const newProduct = {
        //     title,
        //     description,
        //     code,
        //     status,
        //     price,
        //     stock,
        //     category,
        //     thumbnail, 
        //     path
        // }

        // if (arrayProducts.length > 0) {
        //     ProductManager.ultId = arrayProducts.reduce((maxId, product) => Math.max(maxId, product.id), 0);
        // }

        // newProduct.id = ++ProductManager.ultId;

        // una vez que lo puedo crear lo agrego al array
        // arrayProducts.push(newProduct);

        // Una vez que agregamos el nuevo producto al array, guardamos el array al archivo
    //     await this.saveProducts(newProduct);
    // }


      // console.log("titulo: " + req.body.title);
    // console.log("Descripcion: " + req.body.description);
    // console.log("Codigo: " + req.body.code);
    // console.log("Status: " + req.body.status);
    // console.log("Precio: " + req.body.price);
    // console.log("Stock: " + req.body.stock);
    // console.log("Categoria: " + req.body.category);

    // const newProduct = {
    //     title: req.body.title,
    //     description: req.body.description,
    //     code: req.body.code,
    //     status: req.body.status,
    //     price: req.body.price,
    //     stock: req.body.stock,
    //     category: req.body.category,
    //     path: `/img/${req.file.filename}`,
    // }

    // const { title, description, code, status, price, stock, category } = req.body;
    // // Crear el nuevo producto
    // const newProduct = {
    //   title,
    //   description,
    //   code,
    //   status: status === "true", // Convertir a booleano
    //   price: Number(price),     // Asegurar que sea número
    //   stock: Number(stock),     // Asegurar que sea número
    //   category,
    //   path: `/img/${req.file.filename}`
    // };