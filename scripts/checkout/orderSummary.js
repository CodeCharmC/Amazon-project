import { cart, deleteCartProduct, calculateCartQuantity, updateQuantity, updateDeliveryOptions } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formateCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOption.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function renderOrderSummary() {
   let orderSummaryHtml = "";
   cart.forEach((cartItem) => {
      const productId = cartItem.productId;
      //de-doublicating data 
      let matchingProduct;
      products.forEach((product) => {
         if (product.id === productId) {
            matchingProduct = product;
         }
      })

      const deliveryOptionId = cartItem.deliveryOptionsId;
      let deliveryOption;

      deliveryOptions.forEach((option) => {
         if (option.id === deliveryOptionId) {
            deliveryOption = option;
         };
      });

      orderSummaryHtml += `
         <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
               Delivery date: ${calculateDate(deliveryOption)}
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
                     ${formateCurrency(matchingProduct.priceCents)}
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
                        class="quantity-input js-product-quantity-${matchingProduct.id}"
                        value="${cartItem.quantity}"
                     >

                     <span 
                        class="save-quantity-link link-primary js-save-quantity"
                        data-save-cart-product-id = "${matchingProduct.id}"
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
         const price = (deliveryOption.priceCents === 0) ? ("FREE") : (`$${formateCurrency(deliveryOption.priceCents)}`);

         const isChecked = cartItem.deliveryOptionsId === deliveryOption.id;
         
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
                     ${calculateDate(deliveryOption)}
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

   function calculateDate(deliveryOption) {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliverDays, "day").format("dddd, MMMM D");
      return deliveryDate;
   };

   document.querySelectorAll(".js-delete-cart-product").forEach((link) => {
      link.addEventListener(("click"), () => {
         const productId = link.dataset.deleteCartProductId;
         deleteCartProduct(productId);
         document.querySelector(`.js-cart-item-container-${productId}`).remove();
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
            renderOrderSummary();
         };
      });
   });
   
   document.querySelector(".js-return-to-home-link").textContent = `${calculateCartQuantity()} items`;

   document.querySelectorAll(".js-delivery-option").forEach((option) => {
      option.addEventListener(("click"), () => {
         const { productId, deliveryOptionsId } = option.dataset;
         updateDeliveryOptions(productId, deliveryOptionsId);
         renderOrderSummary();
      });
   });
};