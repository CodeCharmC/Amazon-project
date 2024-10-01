export let carts = [];

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