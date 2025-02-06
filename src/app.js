// TERCERA PRE ENTREGA

// IMPORTS
import express from "express";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import productsRouter from "./routers/products.routes.js";
import cartsRouter from "./routers/carts.routes.js"
import viewsRouter from "./routers/views.router.js";
import "./config/database.js";
import path from "path";
import listEndpoints from "express-list-endpoints";

// CONSTANTS GLOBAS
const app = express();
const PORT = 8080;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

// VIEWS
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// ROUTER   
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// console.log(listEndpoints(app));
//LISTENER
app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
});



