import express from "express";

import connectDB from "./src/config/db.js";
import ProductsRoutes from "./src/routes/Products.routes.js"
import ordersRoutes from "./src/routes/Order.routes.js"
import morgan from "morgan";
import cors from "cors";

//conectamos a la base de datos
connectDB();

const app=express();

//crear middlewares
app.use(express.json());// Middleware específico para rutas con JSON
app.use(morgan("dev"));
console.log(app);
const origenesPermitidos=["http://127.0.0.1:5500"];

const corsOptions = { 
    origin: (origin, callback) => {
        if (!origin || origenesPermitidos.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Cliente no permitido"));
        }
    }
   
};

app.use(cors(corsOptions))

const PORT=process.env.PORT || 5000;

//rutas 
app.use("/api/products",ProductsRoutes)
app.use("/api/orders",ordersRoutes)




//ponemos en escucha el servidor
app.listen(PORT,()=>{
    console.log(`servidor corriendo en el puerto ${PORT}`);
});



/*
RUBRICAS DE EVALUACION
1. Productos
ÓPTIMO: Los productos se visualizan correctamente en la vista de productos, y la misma cuenta con una paginación funcional. Además, el método GET "/api/products" permite filtrar por categoría o por disponibilidad, y ordenarse por precio de manera ascendente o descendente.

CORRECTO: Los productos se visualizan correctamente en la vista de productos, y la misma cuenta con una paginación funcional. Sin embargo, el método GET "/api/products" no puede filtrar por categoría o por disponibilidad, y/o ordenar por precio de manera ascendente o descendente.

BAJO: Los productos se visualizan correctamente en la vista de productos, pero no cuentan con una paginación funcional. Además, el método GET "/api/products" no puede filtrar y/o ordenar dinámicamente por query params.

NULO: El proyecto no cuenta con una vista de productos. Además, el método GET "/api/products" no puede filtrar y/o ordenar dinámicamente por query params.

2. Carrito
ÓPTIMO: Los métodos DELETE eliminan correctamente los productos del carrito. Los métodos PUT actualizan correctamente los elementos del carrito. Se realiza correctamente un populate al momento de obtener un carrito.

CORRECTO: Los métodos DELETE eliminan correctamente los productos del carrito. Los métodos PUT actualizan correctamente los elementos del carrito. Sin embargo, no se realiza un populate de los productos al momento de obtener un carrito.

BAJO: Los métodos DELETE no elimina correctamente los productos del carrito. Los métodos PUT no actualizan correctamente los elementos del carrito. No se realiza un populate de los productos al momento de obtener un carrito.

NULO: No es posible corregir este criterio pues no se encuentra ningún servicio referido a la gestión de los carritos de compra en el proyecto.

3. Validaciones
ÓPTIMO: Los servicios que agregan y modifican productos contemplan los casos de datos faltantes o incorrectos y devuelven sus correspondientes mensajes de error. Asimismo, se capturan posibles errores fatales en el código impidiendo así el reinicio del servidor en dichos casos.

CORRECTO: Los servicios que agregan y modifican productos contemplan los casos de datos faltantes o incorrectos y devuelven mensajes de errores genéricos. No se capturan posibles errores fatales en el código, permitiendo el reinicio del servidor en dichos casos al momento de consumir algún servicio específico.v BAJO: Los servicios que reciben datos del cliente para agregar o actualizar información poseen algunas validaciones, pero no contemplan todos los casos. Además, no se capturan posibles errores fatales en el código, permitiendo el reinicio del servidor en dichos casos al momento de consumir algún servicio específico.

NULO: No se realiza ningún manejo de errores en el proyecto y tampoco una validación de datos, esto genera varios errores fatales en el código.

4. Persistencia de Datos
ÓPTIMO: Se incorpora una correcta persistencia en MongoDB mediante la dependencia mongoose y los esquemas de datos están bien definidos.

CORRECTO: Se incorpora una correcta persistencia en MongoDB mediante la dependencia mongoose. Sin embargo, los esquemas de datos no están bien definidos en sus tipos de datos o atributos particulares.

BAJO: Se incorpora una persistencia de datos en MongoDB en algunas funcionalidades, pero en otras aún se sigue utilizando FS.

NULO: No se incorporó una persistencia de datos en MongoDB. Todo el proyecto sigue utilizando FS o variables de Javascript para persistir la información.
*/