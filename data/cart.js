//Procedual Programming

export let cart;

loadCart();

export function loadCart() {
   cart = JSON.parse(localStorage.getItem("cart")) || [
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
};

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
};

export function calculateCartQuantity() {
   let cartQuantity = 0;
   cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
   });
   return cartQuantity;
};

export function addToCart(productId, productQuantity) {
   let matchingItem = ismatching(productId);
      
   if (matchingItem) {
      matchingItem.quantity += productQuantity;
   } else {
      cart.push({
         productId,
         quantity: productQuantity,
         deliveryOptionsId: "1"
      });
   };
   saveToLocalStorage();   
};

export function updateQuantity(productId, newcartQuantity) { 
   let matchingItem = ismatching(productId);
   
   if (matchingItem) {
      ((!isNaN(newcartQuantity) && newcartQuantity > 0) ? (matchingItem.quantity = newcartQuantity) : (alert("Enter a valid quantity!")));      
   } else {
      cart.push({
         productId,
         quantity: newcartQuantity,
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