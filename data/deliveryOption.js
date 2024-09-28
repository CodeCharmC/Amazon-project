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