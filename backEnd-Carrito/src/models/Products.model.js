import {Schema,model} from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true }, // Nueva categoría
    available: { type: Boolean, default: true } // Disponibilidad
});

export default model("Prouct",productSchema);