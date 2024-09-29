import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; 

export function calculateDeliveryDate(deliveryOption) {
   const today = dayjs();
   const deliveryDateIndex = today.add(deliveryOption.deliverDays, "day")
   if (deliveryDateIndex.day() === 0) {      
      const deliveryDate = deliveryDateIndex.add(1, "day").format("dddd, MMMM D");
      return deliveryDate;
   }
   const deliveryDate = deliveryDateIndex.format("dddd, MMMM D");
   return deliveryDate;   
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
];