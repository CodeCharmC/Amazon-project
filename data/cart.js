export let cart = JSON.parse(localStorage.getItem("cart")) || [
   {
      productId: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
      quantity: 1,
      deliveryOptionsId: "1"
   },
   {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionsId: "3"
   }
];

function ismatching(productId) {
   let matchingItem;
   cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
         matchingItem = cartItem;
      }
   });  
   return matchingItem;
};

function saveToLocalStorage() {
   localStorage.setItem("cart", JSON.stringify(cart));
};

export function deleteCartProduct(productId) {
   let newCart = [];

   cart.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
         newCart.push(cartItem);
      };
   });

   cart = newCart;
   saveToLocalStorage();
   let cartQuantity = calculateCartQuantity();
   document.querySelector(".js-return-to-home-link").textContent = `${cartQuantity} items`;
};

export function calculateCartQuantity() {
   let cartQuantity = 0;
   cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
   });
   return cartQuantity;
};

export function addToCart(productId) {
   let matchingItem = ismatching(productId);

   let selectedProduct = (document.querySelector(`.js-product-quantity-${productId}`));
   let selectedProductValue = parseInt(selectedProduct.value);
      
   if (matchingItem) {
      matchingItem.quantity += selectedProductValue;
   } else {
      cart.push({
         productId,
         quantity: selectedProductValue,
         deliveryOptionsId: "1"
      });
   };
   saveToLocalStorage();   
};

export function updateQuantity(productId, cartQuantity) {
   let matchingItem = ismatching(productId);
   
   if (matchingItem) {
      matchingItem.quantity = cartQuantity;
   } else {
      cart.push({
         productId,
         quantity: cartQuantity,
         deliveryOptionsId: "1"
      });
   };
   saveToLocalStorage();
};

export function updateDeliveryOptions(productId, deliveryOptionsId) {
   let matchingItem = ismatching(productId);
   
   if (matchingItem) {
      matchingItem.deliveryOptionsId = deliveryOptionsId;
   } else {
      cart.push({
         productId,
         quantity: 1,
         deliveryOptionsId
      });
   };
   saveToLocalStorage();
};