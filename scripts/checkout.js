import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
//import { loadProducts } from "../data/products.js";
import { loadProducts, loadProductsFetch } from "../data/products-from-backend.js";
import { loadCarts } from "../data/cart-from-backends.js";

//import "../data/backend-practic.js";


Promise.all([
   loadProductsFetch(),
   new Promise((resolve) => {
      console.log("Loading carts...");
      loadCarts(() => {
         console.log("Carts loaded");
         resolve("Another value");
      }); 
   })   
]).then((values) => {
   console.log(values);
   renderOrderSummary();
   renderPaymentSummary();
   renderCheckoutHeader();
});

//we use Promise and resolve instead of callback functions because they are easier to read and solve nesting.

/*
renderCheckoutHeader();
loadProducts(() => {  
   loadCarts(() => {
      renderOrderSummary();
      renderPaymentSummary();
   });   
});
*/