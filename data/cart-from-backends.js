export let carts = [];



export async function loadCartFetch() {
  const response = await fetch("https://supersimplebackend.dev/cart");
    
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }

    const text = await response.text(); 
    console.log(text); 

    const productDetails = JSON.parse(text); 
    
    carts = productDetails.map((product) => {
      console.log(product); 
      return new Cart(product);
    });
};
loadCartFetch();

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