import { Router } from "express";
import ProductManager from "../managers/product-manager.js"

const viewsRouter = Router();
const productManager = new ProductManager();

viewsRouter.route("/products")
.get(async (req, res) => {
    try {
        const { page = 1, limit = 4 } = req.query;
        const products = await productManager.getProducts({
            page: parseInt(page),
            limit: parseInt(limit)
        });
        const productsResult = products.docs.map(
            prod => {
                const { _id, ...rest } = prod.toObject();
                return rest
            }
        )
        res.render('products', { 
            products: productsResult,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            currentPage: products.page,
            totalPages: products.totalPages
    })
    } catch (error) {
        console.error("Error al cargar los Productos", error);
        res.status(500).send("Error en el servidor al cargar los Productos");
    }
})

viewsRouter.route("/products/upload")
    .get((req, res) => {
        res.render('upload')
    })
    .post(async (req, res) => {
        try {
            const newProduct = await productManager.addProduct(req.body);
            res.redirect("/");
        } catch (error) {
            console.error("Error al guardar los Productos + R", error);
            res.status(500).send("Error en el servidor al guardar los Productos + R");
        }
    });

    viewsRouter.route("/carts")
    .get( (req, res) => {
        try {
            res.render('carts');
        } catch (error) {
            console.error("Error al cargar los Carritos", error);
            res.status(500).send("Error en el servidor al cargar los Carritos");
        }
    });

export default viewsRouter; 