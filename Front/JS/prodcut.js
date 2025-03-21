import { cartFunction } from "./cart.js";

const API_URL = "http://localhost:5000/api/products";
let allProducts=[];
const $container = document.getElementById("product-container");
const $filter = document.getElementById("category-filter");
export const data = async () => {

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
    allProducts=products.payload;//Guardar los productos originales
    renderProducts(allProducts);
   
  } catch (error) {
    console.error("Error al obtener los productos", error);
  }
};

const renderProducts=(product)=>{
  $container.innerHTML = "";//limpiar el conntenedor antes de mostrar productos

  product.forEach(product=>{
    const productHTML=
    ` <div class="product-card">
    <img src="img/products/${product._id}.webp" alt="${product.name}">
    <h2 class="product-name">${product.name}</h2>
    <p class="product-price">${product.price}</p>
    <p class="product-description">${product.description}</p>
    <p class="product-category">${product.category}</p>
    <div class="container-cart">
        <button id="${product._id}" class="add-to-cart">Agregar al carrito</button>
    </div>
</div>`;
$container.insertAdjacentHTML("beforeend", productHTML);
   cartFunction();
  })
}

//escuchar cambios en el filtro
$filter.addEventListener("change", (e) => {
  const selectedCategory = e.target.value;
  
  if (selectedCategory === "all") {
      renderProducts(allProducts); // Mostrar todos los productos
  } else {
      const filteredProducts = allProducts.filter(product => product.category === selectedCategory);
      renderProducts(filteredProducts);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  data(); // Llamamos a la función para obtener los productos
});
