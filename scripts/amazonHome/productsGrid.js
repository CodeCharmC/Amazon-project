import { products } from "../../data/products.js";
import { addToCart } from "../../data/cart.js";
import { renderAmazonHeader } from "./amazonHeader.js";

export function renderProductsGrid() { 
   let productHtml = "";
   products.forEach(product => {
      productHtml += `
         <div class="product-container">

            <div class="product-image-container">
               <img class="product-image"
                  src="${product.image}"
               >
            </div>

            <div class="product-name limit-text-to-2-lines">
               ${product.name}
            </div>

            <div class="product-rating-container">
               <img 
                  class="product-rating-stars"
                  src="${ product.getStarsUrls() }"
               >
               <div class="product-rating-count link-primary">
                  ${product.rating.count}
               </div>
            </div>

            <div class="product-price">
               ${product.getFormatedPrice()}
            </div>

            <div class="product-quantity-container">
               <select class="js-product-quantity-${product.id}">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
               </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
               <img src="images/icons/checkmark.png">
               Added
            </div>

            <button
               class="add-to-cart-button button-primary js-add-to-cart-btn"
               data-product-id= "${product.id}"
            >
               Add to Cart
            </button>

         </div>`
   
      document.querySelector(".js-products-grid").innerHTML = productHtml;
   });
   document.querySelectorAll(".js-add-to-cart-btn").forEach((button) => {
      button.addEventListener("click", () => {
         const { productId } = button.dataset;

         addToCart(productId);
         renderAmazonHeader();
         addedToCartMessage(productId);

      });      
   });   

   function addedToCartMessage(productId) {
      document.querySelector(`.js-added-to-cart-${productId}`).classList.add("added-to-cart2");
      setTimeout(() => {
         document.querySelector(`.js-added-to-cart-${productId}`).classList.remove("added-to-cart2");
      }, 2000);
   };
};
