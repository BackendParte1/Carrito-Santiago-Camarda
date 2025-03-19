let cart=JSON.parse(localStorage.getItem("cart")) || [];

const ORDER_URL="http://localhost:5000/api/orders";


const $cartConten=document.getElementById("cart-counter");

const $cartTableBody=document.getElementById("cart-table").querySelector("t-body");

const da