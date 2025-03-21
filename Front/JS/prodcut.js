import { cartFunction } from "./cart.js";

const API_URL = "http://localhost:5000/api/products";

export const data = async () => {
  const $container = document.getElementById("product-container");

  try {
    const response = await fetch(API_URL);
    const products = await response.json();
 // Verifica si la respuesta es válida
 if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
    // 🔹 Verificar si la respuesta contiene los productos correctamente
    if (!products.payload || !Array.isArray(products.payload)) {
      throw new Error("La respuesta del servidor no es válida");
    }
    products.payload.forEach(product => {
        const productHTML = `
        <div class="product-card">
            <img src="img/products/${product._id}.webp" alt="${product.name}">
            <h2 class="product-name">${product.name}</h2>
            <p class="product-price">${product.price}</p>
            <p class="product-description">${product.description}</p>
            <div class="container-cart">
                <button id="${product._id}" class="add-to-cart">Agregar al carrito</button>
            </div>
        </div>`;

 
        $container.insertAdjacentHTML("beforeend", productHTML);
       
    });
    cartFunction();
  } catch (error) {
    console.error("eror al obtener los productos", error);
  }
};

data();
