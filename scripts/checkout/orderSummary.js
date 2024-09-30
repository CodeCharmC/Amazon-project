import { cart, deleteCartProduct, updateQuantity, updateDeliveryOptions } from "../../data/cart.js";
import { ismatchingProduct } from "../../data/products.js";
import { isdelivery, deliveryOptions, calculateDeliveryDate } from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
   let orderSummaryHtml = "";
   cart.forEach((cartItem) => {
      const productId = cartItem.productId;
      let matchingProduct = ismatchingProduct(productId);

      const deliveryOptionId = cartItem.deliveryOptionsId;
      let deliveryOption = isdelivery(deliveryOptionId);

      orderSummaryHtml += `
         <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
               Delivery date: ${calculateDeliveryDate(deliveryOption)}
            </div>

            <div class="cart-item-details-grid">
               <img
                  class="product-image"
                  src="${matchingProduct.image}"
               >

               <div class="cart-item-details">
                  <div class="product-name">
                     ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                     ${matchingProduct.getFormatedPrice()}
                  </div>
                  <div class="product-quantity">
                     <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                     </span>
                     <span 
                        class="update-quantity-link link-primary js-update-quantity-link"
                        data-update-cart-product-id = "${matchingProduct.id}"
                     >
                        Update
                     </span>

                     <input
                        type="number"
                        class="quantity-input js-product-quantity-${matchingProduct.id} js-quantity-input"
                        value="${cartItem.quantity}"
                     >

                     <span 
                        class="save-quantity-link link-primary js-save-quantity"
                        data-save-cart-product-id = "${matchingProduct.id}"
                        tabindex= "0"                        
                     >
                        Save
                     </span>

                     <span 
                        class="delete-quantity-link link-primary js-delete-cart-product"
                        data-delete-cart-product-id = "${matchingProduct.id}"
                     >
                        Delete
                     </span>
                  </div>
               </div>

               <div class="delivery-options">
                  <div class="delivery-options-title">
                     Choose a delivery option:
                  </div>
                  ${deliveryOptionsHtml(matchingProduct, cartItem)}
               </div>
            </div>
         </div>
      `
   })
   document.querySelector(".js-order-summary").innerHTML = orderSummaryHtml;

   function deliveryOptionsHtml(matchingProduct, cartItem) {
      let deliveryOptionsHtml = "";

      deliveryOptions.forEach((deliveryOption) => {
         const price = (deliveryOption.priceCents === 0) ? ("FREE") : (`$deliveryOption.getFormatedPrice()`);

         const isChecked = (cartItem.deliveryOptionsId === deliveryOption.id);
         
         deliveryOptionsHtml +=`
            <div 
               class="delivery-option js-delivery-option"
               data-delivery-options-id = ${deliveryOption.id}
               data-product-id = ${matchingProduct.id}
            >
               <input 
                  type="radio"
                  ${isChecked ? "checked" : ""}
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}"
               >
               <div>
                  <div class="delivery-option-date">
                     ${calculateDeliveryDate(deliveryOption)}
                  </div>
                  <div class="delivery-option-price">
                     ${price} - Shipping
                  </div>
               </div>
            </div>
         `
      });

      return deliveryOptionsHtml;
   };

   document.querySelectorAll(".js-delete-cart-product").forEach((link) => {
      link.addEventListener(("click"), () => {
         const productId = link.dataset.deleteCartProductId;
         deleteCartProduct(productId);
         renderCheckoutHeader();
         renderOrderSummary();
         renderPaymentSummary();
      });
   });

   document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
      link.addEventListener(("click"), () => {
         const productId = link.dataset.updateCartProductId;
         document.querySelector(`.js-cart-item-container-${productId}`).classList.add("is-editing");
      });
   });

   document.querySelectorAll(".js-save-quantity").forEach((saveBtn) => {
      saveBtn.addEventListener("click", () => {
         const productId = saveBtn.dataset.saveCartProductId;

         document.querySelector(`.js-cart-item-container-${productId}`).classList.remove("is-editing");

         let productQuantityId = document.querySelector(`.js-product-quantity-${productId}`);
         if (productQuantityId) { 
            const newCartQuantity = Number(productQuantityId.value);            
            updateQuantity(productId, newCartQuantity);
            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
         };
      });
   });

   document.querySelectorAll(`.js-quantity-input`).forEach((input) => {
      input.addEventListener("keydown", (event) => {
         if (event.key === "Enter") {
            event.preventDefault();
            document.querySelector('.js-save-quantity').click();
         };
      });
   });

   document.querySelectorAll(".js-delivery-option").forEach((option) => {
      option.addEventListener(("click"), () => {
         const { productId, deliveryOptionsId } = option.dataset;
         updateDeliveryOptions(productId, deliveryOptionsId);
         renderOrderSummary();
         renderPaymentSummary();
      });
   });
};