

export const cartFunction=()=>{
    const $addToCartButton = document.querySelectorAll(".add-to-cart");
    const $cartCount=document.getElementById("cart-counter");
    const $totalPriceDisplay = document.getElementById("total-price"); // Elemento para mostrar el total

   
    // Obtener el carrito del localStorage o inicializarlo como un array vacío
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");


    const updateCount=()=>{
        const totalItems = cart.reduce((acum, item) => acum + item.quantity, 0); 
        console.log("Total Items:", totalItems); // Debug
        $cartCount.textContent=totalItems
    };

    const updateTotalPrice = () => {
        const totalPrice = cart.reduce((acum, item) => acum + item.productPrice * item.quantity, 0);
        console.log("Total Price:", totalPrice.toFixed(2)); // Debug
        $totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`; // Actualiza el total en el HTML
    };
    const addToCart= (productId,productName,productPrice)=>{
        const existingProduct=cart.find((item)=>item.productId===productId);

        if(existingProduct)
        {
            existingProduct.quantity++;
        }else
        {
            const newProduct={
                productId:productId,
                productName:productName,
                productPrice:productPrice,
                quantity:1,

            };
            cart.push(newProduct);
        }
        localStorage.setItem("cart",JSON.stringify(cart));
        updateCount();
        updateTotalPrice();
    }

    $addToCartButton.forEach(button=> {
        button.addEventListener("click",(e)=>{
            const productCard=e.target.closest(".product-card")
            if (!productCard) return; 

            const productId = e.target.id || productCard.dataset.id; 
           const productName = productCard.querySelector(".product-name")?.textContent.trim();
        const productPrice=parseFloat(productCard.querySelector(".product-price")?.textContent.replace("$", ""))
       
        if (!productId || !productName || isNaN(productPrice)) {
            console.error("Error al agregar producto: Datos inválidos.");
            return;
        }

        addToCart(productId, productName, productPrice);
        });


        
    });

    updateCount();
}

document.addEventListener("DOMContentLoaded", () => {
    cartFunction();
});
