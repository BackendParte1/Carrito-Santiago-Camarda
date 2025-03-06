import Product from "../models/Products.model.js";


export const getProducts = async (req, res) => {
    try {
      const products = await Product.find();
  
      if (!products || products.length === 0) {
        return res.status(404).json({ message: "No hay productos cargados" });
      }
  
      // ✅ Solo enviamos una única respuesta
      return res.status(200).json({ status: "success", payload: products });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  };
  


//agregar Productos
export const addProduct=async(req,res)=>{
    try {

        const newProduct=new Product(req.body);

        if(!newProduct)
        {
            return res.status(404).json({message:"campos incompletos"})
        }
        await newProduct.save();
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error("EROOR AL GUARDAR EL PRODUCT");
        res.status(500).send({ status: "error", message: error.message });

    }
}

// Agregar múltiples productos
export const addProductsMany = async (req, res) => {
    try {
        const products = req.body; // Recibe un array de productos

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Se requiere un array de productos" });
        }

        const newProducts = await Product.insertMany(products); // Inserta varios productos en MongoDB

        return res.status(201).json({ message: "Productos agregados correctamente", newProducts });
    } catch (error) {
        console.error("Error al agregar productos:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
};

//eliminar Productos
export const deleteProducts = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.productId);
        
        if (!deleteProduct) {
            return res.status(404).json({ message: "No se encontró el producto a eliminar" });
        }

        return res.status(200).json({ message: "Producto eliminado correctamente" }); 
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};