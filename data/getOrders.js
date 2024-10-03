export let orders = JSON.parse(localStorage.getItem('orders')) || [
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
export function addOrder(order) {
   orders.unshift(order);
   saveToStorage();
}

function saveToStorage() {
   localStorage.setItem('orders', JSON.stringify(orders));
}


 