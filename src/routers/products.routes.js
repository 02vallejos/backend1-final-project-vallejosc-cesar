import { Router } from "express";
import ProductManager from "../managers/product-manager.js";

const productsRouter = Router();
const productManager = new ProductManager();

    productsRouter.route("/")
    
    //Vista del JSON
    productsRouter.get("/", async (req, res) => { 
        try {
            const { limit = 10, page = 1, sort, query } = req.query;

        const productos = await productManager.getProducts({
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query,
        });

        res.json({
            status: 'success',
            payload: productos,
            totalPages: productos.totalPages,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            page: productos.page,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevLink: productos.hasPrevPage ? `/api/products?limit=${limit}&page=${productos.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: productos.hasNextPage ? `/api/products?limit=${limit}&page=${productos.nextPage}&sort=${sort}&query=${query}` : null,
        });
        } catch (error) {
            console.error("Error al mostrar los Productos en JSON", error);
            res.status(500).send("Error en el servidor al mostrar los Productos en JSON");
        }
    })

productsRouter.get("/delete/:pid", async (req, res) => {
    try {
        const productId = req.params.pid;   
        const updatedCart = await productManager.deleteProductById(productId);
        res.redirect("/products");
    } catch (error) {
        console.error("Error al eliminar el producto", error);
    }
})

export default productsRouter;