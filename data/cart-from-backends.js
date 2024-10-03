import { Cart } from "./cart-class.js";
export let carts = [];

export async function loadCartFetch() {
  try {
    const response = await fetch("https://supersimplebackend.dev/cart");
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }

    const text = await response.text(); 
    //const productDetails = JSON.parse(text);

    carts = [];
    
    carts.map((product) => {
      console.log(product); 
      return new Cart(product);
    });

    localStorage.setItem("cart-oop", JSON.stringify(carts));
    return carts;

  } catch (error) {
    console.error("Error loading cart:", error);
    throw error;
  };
};
loadCartFetch();



/*

export function loadCarts(functionCall) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    //console.log(xhr.response);
    //console.log("Cart loaded");
    functionCall();
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
};
*/