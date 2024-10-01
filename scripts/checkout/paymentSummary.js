import { cart, calculateCartQuantity } from "../../data/cart.js";
//import { ismatchingProduct } from "../../data/products.js";
import { ismatchingProduct } from "../../data/products-from-backend.js";
import { formateCurrency } from "../utils/money.js";
import { isdelivery } from "../../data/deliveryOption.js";

export function renderPaymentSummary() { 
   let paymentSummaryHtml = "";
   let totalPrice = 0;
   let totalDeliveryCost = 0;
   cart.forEach((cartItem) => {
      const productId = cartItem.productId;
      calculateTotalPrice(productId, cartItem);

      const deliveryOptionId = cartItem.deliveryOptionsId;
      calculateShippingCost(deliveryOptionId, cartItem);
   });
   const totalBeforeTax = totalPrice + totalDeliveryCost;
   const tax = totalBeforeTax * (10 / 100);
   const orderTotal = totalBeforeTax + tax;

   function calculateShippingCost(deliveryOptionId, cartItem) {    
      const deliveryOption = isdelivery(deliveryOptionId);
      if (deliveryOption) {
         const totalPricePerDelivery = deliveryOption.priceCents * cartItem.quantity;
         totalDeliveryCost += totalPricePerDelivery;
      };
      return formateCurrency(totalDeliveryCost);
   };

   function calculateTotalPrice(productId, cartItem) {
      const matchingProduct = ismatchingProduct(productId);
      if (matchingProduct) {
         const totalPricePerProduct = matchingProduct.priceCents * cartItem.quantity;
         totalPrice += totalPricePerProduct;
      };
      return formateCurrency(totalPrice);
   };

   paymentSummaryHtml += `
      <div class="payment-summary-title">
         Order Summary
      </div>

      <div class="payment-summary-row">
         <div>Items (${calculateCartQuantity()}):</div>
         <div class="payment-summary-money">
            $${formateCurrency(totalPrice)}
         </div>
      </div>

      <div class="payment-summary-row">
         <div>Shipping &amp; handling:</div>
         <div class="payment-summary-money">
            $${formateCurrency(totalDeliveryCost)}
         </div>
      </div>

      <div class="payment-summary-row subtotal-row">
         <div>Total before tax:</div>
         <div class="payment-summary-money">
            $${formateCurrency(totalBeforeTax)}
         </div>
      </div>

      <div class="payment-summary-row">
         <div>Estimated tax (10%):</div>
         <div class="payment-summary-money">
            $${formateCurrency(tax)}
         </div>
      </div>

      <div class="payment-summary-row total-row">
         <div>Order total:</div>
         <div class="payment-summary-money">
            $${formateCurrency(orderTotal)}
         </div>
      </div>

      <button class="place-order-button button-primary">
         Place your order
      </button>
   `
   document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHtml;
};

