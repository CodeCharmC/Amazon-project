import { cart, deleteCartProduct, calculateCartQuantity, addToCart, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formateCurrency } from "./utils/money.js";

let orderSummaryHtml = "";
cart.forEach((cartItem) => {
   const productId = cartItem.productId;

   //de-doublicating data or normalizing the data --> to get other data from the products array just using the productId from the cart 
   let matchingProduct;
   products.forEach((product) => {
      if (product.id === productId) {
         matchingProduct = product;
      }
   })

   orderSummaryHtml += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
         <div class="delivery-date">
            Delivery date: Tuesday, June 21           //
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

               <div class="delivery-option">
                  <input 
                     type="radio" checked
                     class="delivery-option-input"
                     name="delivery-option-${matchingProduct.id}"
                  >
                  <div>
                     <div class="delivery-option-date">
                        Tuesday, June 21
                     </div>
                     <div class="delivery-option-price">
                        FREE Shipping
                     </div>
                  </div>
               </div>

               <div class="delivery-option">
                  <input 
                     type="radio"
                     class="delivery-option-input"
                     name="delivery-option-${matchingProduct.id}"
                  >
                  <div>
                     <div class="delivery-option-date">
                        Wednesday, June 15
                     </div>
                     <div class="delivery-option-price">
                        $4.99 - Shipping
                     </div>
                  </div>
               </div>
               
               <div class="delivery-option">
                  <input 
                     type="radio"
                     class="delivery-option-input"
                     name="delivery-option-${matchingProduct.id}"
                  >
                  <div>
                     <div class="delivery-option-date">
                        Monday, June 13
                     </div>
                     <div class="delivery-option-price">
                        $9.99 - Shipping
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
   `   
})
document.querySelector(".js-order-summary").innerHTML = orderSummaryHtml;

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
      let cartQuantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value);
      updateQuantity(productId, cartQuantity);
      //console.log(cartQuantity);
   });   
});

let cartQuantity = calculateCartQuantity();
document.querySelector(".js-return-to-home-link").textContent = `${cartQuantity} items`;