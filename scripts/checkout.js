import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";

//import "../data/backend-practic.js";

renderCheckoutHeader();
loadProducts(() => {   
   renderOrderSummary();
   renderPaymentSummary();
});