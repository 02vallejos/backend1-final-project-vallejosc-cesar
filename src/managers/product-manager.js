import * as fs from 'fs/promises';
import ProductsModel from '../models/products.model.js';


class ProductManager {
    static lastId = 0;
    constructor() {
    }

    async addProduct(data) {
        const { title, description, code, status, price, stock, category, thumbnail } = data;
        // Podemos leer el archivo y guardarme el array de producto
       console.log("data:");
       console.log(data);
        if (!title || !description || !code || !status || !price || !stock || !category || !thumbnail) {
            throw new Error("Todos los campos son obligatorios.");
        }
        if (typeof title !== "string" || title.trim() === "") {
            throw new Error("El título debe ser un string válido.");
        }
        if (isNaN(price) || price <= 0) {
            throw new Error("El precio debe ser un número mayor a 0.");
        }
      
        // Crear el nuevo producto
        const newProduct = {
            title,
            description,
            code,
            status: status === "true", // Convertir a booleano
            price: Number(price),     // Asegurar que sea número
            stock: Number(stock),     // Asegurar que sea número
            category,
            thumbnail,
        };

        // validamos el codigo
        const existingProduct = await ProductsModel.findOne({ code });
        if (existingProduct) {
            throw new Error("Ya existe un producto con ese codigo!");
        }
        
        const savedProduct = new ProductsModel(newProduct);
        await this.saveProducts(savedProduct);
    }

    async getProducts({ limit, page, sort, query } = {} ) {
        try {
            const skip = (page - 1) * limit;
            let queryOptions = {};

            if (query) {
                queryOptions = { category: query };
            }

            const sortOptions = {};
            if (sort) {
                if (sort === 'asc' || sort === 'desc') {
                    sortOptions.price = sort === 'asc' ? 1 : -1;
                }
            }

            const products = await ProductsModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);
            
                const totalProducts = await ProductsModel.countDocuments(queryOptions);

                const totalPages = Math.ceil(totalProducts / limit);
                const hasPrevPage = page > 1;
                const hasNextPage = page < totalPages;
    
                return {
                    docs: products,
                    totalPages,
                    prevPage: hasPrevPage ? page - 1 : null,
                    nextPage: hasNextPage ? page + 1 : null,
                    page,
                    hasPrevPage,
                    hasNextPage,
                    prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                    nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
                };      
            // const arrayProducts = await this.readProducts(limit, page, sort, query );
            // return arrayProducts;
        } catch (error) {
            console.error("Error al obtener los Productos - PM", error);
        }
    }

    async getProductById(id) {
        const arrayProducts = await this.readProducts();
        const product = arrayProducts.find(item => item.id === id);

        if (!product) {
            return "Not found!";
        } else {
            return product;
        }
    }

    async saveProducts(product) {
        try {
            await product.save();
        } catch (error) {
            console.error("Error al guardar los Productos - PM", error);
        }
    }

    async updateProductForId(id, productUpdated) {
        try {
            const arrayProducts = await this.readProducts();
            const index = arrayProducts.findIndex(prod => prod.id == id);

            if (index != -1) {
                arrayProducts[index] = { ...arrayProducts[index], ...productUpdated };
                await this.saveProducts(arrayProducts);
                console.log("El producto fue actualizado con exito");
            } else {
                console.log("No se encontro el objeto");
            }
        } catch (error) {
            console.log("Error al actualizar el producto", error);
            throw error;
        }
    }

    async deleteProductById(id) {
        try {
            const arrayProducts = await this.readProducts();
            const index = arrayProducts.findIndex(prod => prod.id == id);

            if (index != -1) {
                arrayProducts.splice(index, 1);
                this.saveProducts(arrayProducts);
                console.log("Producto eliminado con exito!");
            } else {
                console.log("No se encontro el producto");
            }
        } catch (error) {
            console.log("Error al eliminar el producto", error);
            throw error;
        }
    }
}

export default ProductManager;


