import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true, //Evita advertencias sobre la URL de conexión.
      useUnifiedTopology: true, // Usa el nuevo motor de gestión de conexiones de MongoDB.
    });

    console.log("✅ Conexión a MongoDB exitosa");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error.message);
    process.exit(1); // Finaliza el proceso en caso de error
    ContentVisibilityAutoStateChangeEvent
  }
};
export default connectDB;
