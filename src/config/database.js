import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoIrl = process.env.MONGO_URL;

mongoose.connect(mongoIrl)
.then((result) => {
    console.log("Conectados a la base de datos");
}).catch((err) => {
    console.error("Tenemos un error en la base de datos", err);
});
