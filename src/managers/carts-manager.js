import CartModel from "../models/carts.models.js";

class CartManager {
    async createCart() {
        try {
            const newCart = new CartModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.log("Error al crear el nuevo carrinho de compriñas" + error);
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                console.log("No existe ese carrito con el id");
                return null;
            }

            return cart;
        } catch (error) {
            console.log("Error al traer el carrito + CM ", error);
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await this.getCartById(cartId);
            const existProduct = cart.products.find(item => item.product.toString() === productId);

            if (existProduct) {
                existProduct.quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }

            //Vamos a marcar la propiedad "products" como modificada antes de guardar: 
            cart.markModified("products");

            await cart.save();
            return cart;

        } catch (error) {
            console.log("error al agregar un producto + CM", error);
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            const cart = await CartModel.findById(cartId);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            //cart.products = cart.products.filter(item => item.product.toString() !== productId);
            cart.products = cart.products.filter(item => item.product._id.toString() !== productId);

            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al eliminar el producto del carrito en el gestor', error);
            throw error;
        }
    }


    async updateCart(cartId, updatedProducts) {
        try {
            const cart = await CartModel.findById(cartId);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            cart.products = updatedProducts;

            cart.markModified('products');

            await cart.save();

            return cart;
        } catch (error) {
            console.error('Error al actualizar el carrito en el gestor', error);
            throw error;
        }
    }

    async updateProductQuantity(cartId, productId, newQuantity) {
        try {

            // console.log("cart id " + cartId)
            // console.log("productId " + productId)
            // console.log("newQuantity " + newQuantity)

            // const cart = await CartModel.findById(cartId).populate('products.product', '_id title price');

            // if (!cart) {
            //     throw new Error('Carrito no encontrado');
            // }

            // console.log("datos de cart " + cart)
            // console.log("datos de cart:", JSON.stringify(cart, null, 2));


            const cart = await CartModel.findById(cartId);
            // console.log("cart: " + cart)

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const productIndex = cart.products.findIndex(
                item => item.product._id.toString() == productId
            );

            // console.log("cart.products: " + cart.products)

            if (productIndex !== -1) {
                cart.products[productIndex].quantity = newQuantity;

                cart.markModified('products');

                await cart.save();
                return cart;
            } else {
                throw new Error('Producto no encontrado en el carrito');
            }
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto en el carrito - CM', error);
            throw error;
        }
    }

    async deleteCart(cartId) {
        try {
            const cart = await CartModel.findByIdAndUpdate(
                cartId,
                { products: [] },
                { new: true }
            );

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            return cart;
        } catch (error) {
            console.error('Error al vaciar el carrito en el gestor', error);
            throw error;
        }
    }
}

export default CartManager;