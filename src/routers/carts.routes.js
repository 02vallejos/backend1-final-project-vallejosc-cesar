import { Router } from 'express';
import CartManager from '../managers/carts-manager.js';
import CartsModel from '../models/carts.models.js';


const cartsRouter = Router();
const cartManager = new CartManager();

cartsRouter.post("/", async (req, res) => {
    try {
        // console.log("api cart")
        const newCart = await cartManager.createCart();
        console.log("newCart")
        console.log(newCart)
        // res.json(newCart);
    } catch (error) {
        console.error("Error al crear un nuevo carrito - CR", error);
        res.status(500).json({ error: "Error interno del servidor - CR" });
    }
});

// 2) Listamos los productos que pertenecen a determinado carrito.
cartsRouter.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    console.log("cart es " + cartId);

    try {
        const cart = await CartsModel.findById(cartId);

        if (!cart) {
            console.log("No existe ese carrito con el id");
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        return res.json(cart.products);
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// 3) Agregar productos a distintos carritos.
cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const updateCart = await cartManager.addProductToCart(cartId, productId, quantity);
        res.json(updateCart.products);
    } catch (error) {
        console.error("Error al agregar producto al carrito", error);
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// 4) Eliminamos un producto específico del carrito.
cartsRouter.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const updatedCart = await cartManager.deleteProductFromCart(cartId, productId);

        res.json({
            status: 'success',
            message: 'Producto eliminado del carrito correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al eliminar el producto del carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

// 5) Actualizamos productos del carrito:
cartsRouter.put('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const updatedProducts = req.body;

    try {
        const updatedCart = await cartManager.updateCart(cartId, updatedProducts);
        res.json(updatedCart);
    } catch (error) {
        console.error('Error al actualizar el carrito + CM', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

// 6) Actualizamos las cantidades de productos
cartsRouter.put('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const newQuantity = req.body.quantity;

        const updatedCart = await cartManager.updateProductQuantity(cartId, productId, newQuantity);

        res.json({
            status: 'success',
            message: 'Cantidad del producto actualizada correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al actualizar la cantidad del producto en el carrito + CR', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

// 7) Vaciamos el carrito:
cartsRouter.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;

        const updatedCart = await cartManager.vaciarCarrito(cartId);

        res.json({
            status: 'success',
            message: 'Todos los productos del carrito fueron eliminados correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al vaciar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

export default cartsRouter;
