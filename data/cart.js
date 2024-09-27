export let cart = JSON.parse(localStorage.getItem("cart")) || [
   {
      productId: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
      quantity: 1
   }
];

function saveToLocalStorage() {
   localStorage.setItem("cart", JSON.stringify(cart));
}

export function deleteCartProduct(productId) {
   let newCart = [];

   cart.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
         newCart.push(cartItem);
      };
   });

   cart = newCart;
   saveToLocalStorage();
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

   saveToLocalStorage();
   
};