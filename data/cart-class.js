//Class: A class is a better way of generating objects oriented programming(oop)

class Cart {
   //cartItems = undefined;
   cartItems;

   //localStorageKey = undefined;
   localStorageKey;

   constructor(localStorageKey) {
      this.localStorageKey = localStorageKey;
      this.loadCart();
   }

   loadCart() {
      this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [
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
   }

   ismatching(productId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
         if (productId === cartItem.productId) {
            matchingItem = cartItem;
         }
      });
      return matchingItem;
   }

   saveToLocalStorage() {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
   }

   deleteCartProduct(productId) {
      let newCart = [];

      this.cartItems.forEach((cartItem) => {
         if (cartItem.productId !== productId) {
            newCart.push(cartItem);
         };
      });

      this.cartItems = newCart;
      this.saveToLocalStorage();
   }  

   calculateCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
         cartQuantity += cartItem.quantity;
      });
      return cartQuantity;
   }

   addToCart(productId) {
      let matchingItem = this.ismatching(productId);
      if (matchingItem) {
         matchingItem.quantity += 1;
      } else {
         this.cartItems.push({
            productId,
            quantity: 1,
            deliveryOptionsId: "1"
         });
      };

      /*      
      let selectedProduct = (document.querySelector(`.js-product-quantity-${productId}`));
      if (!selectedProduct) {
         console.error(`Product with ID ${productId} not found in the DOM.`);
         return; // Exit the function if the product isn't found
      }
      let selectedProductValue = parseInt(selectedProduct.value);

      if (isNaN(selectedProductValue) || selectedProductValue <= 0) {
         console.error(`Invalid quantity for product ID ${productId}: ${selectedProduct.value}`);
         return; // Exit if the quantity is invalid
      }
         
      if (matchingItem) {
         matchingItem.quantity += selectedProductValue;
      } else {
         this.cartItems.push({
            productId,
            quantity: selectedProductValue,
            deliveryOptionsId: "1"
         });
      }; */
      this.saveToLocalStorage();
   }

   updateQuantity(productId, cartQuantity) {
      let matchingItem = this.ismatching(productId);
   
      if (matchingItem) {
         matchingItem.quantity = cartQuantity;
      } else {
         this.cartItems.push({
            productId,
            quantity: cartQuantity,
            deliveryOptionsId: "1"
         });
      };
      this.saveToLocalStorage();
   }

   updateDeliveryOptions(productId, deliveryOptionsId) {
      let matchingItem = this.ismatching(productId);
   
      if (matchingItem) {
         matchingItem.deliveryOptionsId = deliveryOptionsId;
      } else {
         this.cartItems.push({
            productId,
            quantity: 1,
            deliveryOptionsId
         });
      };
      saveToLocalStorage();
   }
};


//1st Object
const cart = new Cart("cart-oop");
console.log(cart);

//2nd Object
const busnessCart = new Cart("cart-busness");
busnessCart.addToCart("82bb68d7-ebc9-476a-989c-c78a40ee5cd9");
console.log(busnessCart);