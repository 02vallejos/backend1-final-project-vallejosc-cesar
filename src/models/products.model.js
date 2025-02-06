import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const nameCollection = "products"

const productsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    code: {
        type: String
    },
    status: {
        type: Boolean
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    category: {
        type: String
    },
    thumbnail: {
        type: String
    }
});

productsSchema.plugin(mongoosePaginate);
const ProductsModel = mongoose.model(nameCollection, productsSchema);

export default ProductsModel;