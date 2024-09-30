import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; 
import { formateCurrency } from "../scripts/utils/money.js";

export function calculateDeliveryDate(deliveryOption) {
   const today = dayjs();
   const deliveryDates = today.add(deliveryOption.deliverDays, "day")

   if (deliveryDates.day() === 0) {      
      return deliveryDates.add(1, "day").format("dddd, MMMM D");      
   } else if (deliveryDates.day() === 6) {
      return deliveryDates.add(2, "day").format("dddd, MMMM D");
   } else return deliveryDates.format("dddd, MMMM D");
};
export function isdelivery(deliveryOptionId) {
   let deliveryOption;

   deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
         deliveryOption = option;
      };
   });
   return deliveryOption || deliveryOptions[0];
};

class DeliveryOption {
   id;
   deliverDays;
   priceCents;
   constructor(deliveryOptionDetails) {
      this.id = deliveryOptionDetails.id;
      this.deliverDays = deliveryOptionDetails.deliverDays;
      this.priceCents = deliveryOptionDetails.priceCents;
   };  
   getFormatedPrice() { 
      return `${formateCurrency(this.priceCents)}`
   };
}

export const deliveryOptions = [
   {
      id: "1",
      deliverDays: "7",
      priceCents: 0
   },
   {
      id: "2",
      deliverDays: "3",
      priceCents: 499
   },
   {
      id: "3",
      deliverDays: "1",
      priceCents: 999
   }
].map((deliveryOptionDetails) => {
   return new DeliveryOption(deliveryOptionDetails);
});