import { renderAmazonHeader } from "../amazonHome/amazonHeader";
import { orders } from "../data/orders.js";

renderAmazonHeader();



function renderOrders() { 
   let ordersHtml = ``;

   orders.forEach((order) => { 
      ordersHtml += ``

   })
   document.querySelector(".js-orders").innerHTML = ordersHtml;
}