const CHECKOUT_URL = "http://localhost:5000/api/orders";

const $cartCount = document.getElementById("cart-counter");
const $cartTableBody = document
  .getElementById("cart-table")
  .querySelector("tbody");
const $checkOutButton = document.getElementById("check-out");

let cart = JSON.parse(localStorage.getItem("cart") || []);
// checkOut.js

const updateCartCount = () => {
  const $cartCount = document.getElementById("cart-counter");
  
  // Obtener el carrito del localStorage
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  
  // Calcular el total de items
  const totalItems = cart.reduce((acum, item) => acum + item.quantity, 0);
  
  // Actualizar el contador en el HTML
  $cartCount.textContent = totalItems;
};

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount(); // Llama a la función para actualizar el contador al cargar la página
});
const renderCart = () => {
  $cartTableBody.innerHTML = "";
  if (cart.length === 0) {
      $cartTableBody.innerHTML = `<tr><td colspan="5">El carrito está vacío</td></tr>`;
      return;
  }

  const rowsHTML = cart
      .map((item) => {
          const productName = item.productName || "Nombre no disponible"; // Valor predeterminado
          const productPrice = item.productPrice || 0; // Valor predeterminado
          const quantity = item.quantity || 0; // Valor predeterminado
          const total = (productPrice * quantity).toFixed(2); // Asegúrate de que no sea undefined

          return `
              <tr>
                  <td>${productName}</td>
                  <td>$${productPrice.toFixed(2)}</td>
                  <td>${quantity}</td>
                  <td>$${total}</td>
                  <td><img class="delete" data-id="${item.productId}" src="/img/trash.svg"/></td>
              </tr>`;
      })
      .join(""); // Unir todas las filas en un string

  $cartTableBody.innerHTML = rowsHTML;

  attatchDeleteEvent();
};

const checkOut = async () => {
  if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
  }

  // Construir el array de items
  const items = cart.map(item => ({
      productId: item.productId,  // Asegúrate de que estas propiedades coincidan con el esquema
      name: item.productName,       // Cambia 'name' a 'productName' para 'name' como en el esquema
      price: item.productPrice,     // Cambia 'productPrice' a 'price' para que coincida con el esquema
      quantity: item.quantity,
  }));

  // Calcular el precio total
  const totalPrice = items.reduce((acum, item) => acum + item.price * item.quantity, 0);

  try {
      const response = await fetch(CHECKOUT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items, totalPrice }), // Incluye totalPrice en el cuerpo
      });

      if (response.ok) {
          localStorage.removeItem("cart");
          cart = [];
          renderCart();
          updateCartCount();
          alert("Compra realizada con éxito");
      } else {
          const errorData = await response.json();
          console.error("Error en el checkout:", errorData);
          alert(`Error al procesar la compra: ${errorData.message || "Error desconocido"}`);
      }
  } catch (error) {
      console.error("Error en el checkout:", error);
      alert(`Error al procesar la compra: ${error.message}`);
  }
};
const deleteCartItem = (productId) => {
  cart = cart.filter((item) => item.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
};

const attatchDeleteEvent = () => {
  const deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-id");
      deleteCartItem(productId);
    });
  });
};




document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  updateCartCount();

  if ($checkOutButton) {
    $checkOutButton.addEventListener("click", () => {
      console.log("Checkout iniciado...");
      checkOut(); // Llamamos a la función de checkout aquí
    });
  } else {
    console.error("Error: No se encontró el botón de checkout en el DOM.");
  }
});

function loadCart() {
  const cartTableBody = document.querySelector("#cart-table tbody");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart.length) {
      cartTableBody.innerHTML = "<tr><td colspan='5'>El carrito está vacío</td></tr>";
      return;
  }

  cartTableBody.innerHTML = "";
  cart.forEach((item, index) => {
      const productName = item.productName || "Nombre no disponible"; // Valor predeterminado
      const productPrice = item.productPrice || 0; // Valor predeterminado
      const quantity = item.quantity || 0; // Valor predeterminado
      const total = (productPrice * quantity).toFixed(2); // Asegúrate de que no sea undefined

      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${productName}</td>
          <td>$${productPrice.toFixed(2)}</td>
          <td>${quantity}</td>
          <td>$${total}</td>
          <td><button class="remove-item" data-index="${index}">Eliminar</button></td>
      `;
      cartTableBody.appendChild(row);
  });

  // Agregar event listeners a los botones de eliminar
  document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          loadCart();
      });
  });
}
// Inicializar contador y renderizar el carrito
updateCartCount();