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

// Agregar orden
export const addOrder = async (req, res) => {
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "El carrito de compras está vacío" });
  }

  try {
    const newOrder = new Order({
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalPrice: items.reduce((accum, item) => accum + item.price * item.quantity, 0)
    });

    await newOrder.save();

    return res.status(201).json({ message: "Orden cargada con éxito" });
  } catch (error) {
    console.error("Error al cargar una orden", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

//me falta una para eliminar y para modificar