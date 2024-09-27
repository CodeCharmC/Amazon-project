export let cart = JSON.parse(localStorage.getItem("cartItem")) || [];

export function deleteCartProduct(productId) {
   let newCart = [];

   cart.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
         newCart.push(cartItem);
      };
   });

   cart = newCart;
   localStorage.setItem("cartItem", JSON.stringify(cart));
};

export function addToCart(productId) {
   let matchingItem;
   cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
         matchingItem = cartItem;
      }
   });

   let selectedProduct = (document.querySelector(`.js-product-quantity-${productId}`));
   let selectedProductValue = parseInt(selectedProduct.value);
      
   if (matchingItem) {
      matchingItem.quantity += selectedProductValue;
   } else {
      cart.push({
         productId,
         quantity: selectedProductValue
      });
   };

   localStorage.setItem("cartItem", JSON.stringify(cart));
   
};