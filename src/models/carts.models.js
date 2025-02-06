import mongoose from "mongoose";

const nameCollection = "carts";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                require: true,
            },
            quantity: {
                type: Number,
                require: true,
            }
        }
    ]
});

cartSchema.pre(['find', 'findOne', 'findById'], function (next) {
    this.populate('products.product', '_id title price');
    next();
});

const CartModel = mongoose.model(nameCollection, cartSchema);

export default CartModel;

