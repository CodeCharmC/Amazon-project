import { cart, calculateCartQuantity } from "../../data/cart.js";
import { ismatchingProduct } from "../../data/products.js";
import { formateCurrency } from "../utils/money.js";
import { isdelivery } from "../../data/deliveryOption.js";

export function renderPaymentSummary() {   
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
};

