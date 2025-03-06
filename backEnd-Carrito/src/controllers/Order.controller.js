import Order from "../models/Orders.model.js";

// Obtener todas las órdenes
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No hay órdenes" });
    }
    return res.json(orders);
  } catch (error) {
    console.log("Error al obtener las órdenes", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
export const addOrder = async (req, res) => {
  const { items } = req.body;
  console.log("Datos recibidos:", JSON.stringify(req.body, null, 2));

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "El carrito de compras está vacío o no es válido" });
  }

  // Validar que todos los items tengan valores numéricos correctos
  const validItems = items.every(item => 
    item.productId && 
    typeof item.name === "string" &&
    typeof item.price === "number" && 
    typeof item.quantity === "number" &&
    item.price > 0 &&
    item.quantity > 0
  );

  if (!validItems) {
    return res.status(400).json({ message: "Datos inválidos en los productos" });
  }

  try {
    const newOrder = new Order({
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalPrice: Math.round(items.reduce((accum, item) => accum + (item.price * item.quantity), 0))
    });

    await newOrder.save();

    return res.status(201).json({ message: "Orden cargada con éxito", order: newOrder });
  } catch (error) {
    console.error("Error al cargar una orden", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

//me falta una para eliminar y para modificar